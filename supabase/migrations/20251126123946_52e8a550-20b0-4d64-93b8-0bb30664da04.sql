-- Update RLS policies to allow public viewing of published posts
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON public.comments;

-- Allow everyone to view published posts (no auth required)
CREATE POLICY "Published posts are viewable by everyone"
ON public.posts
FOR SELECT
USING (published = true OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

-- Allow everyone to view comments (no auth required)
CREATE POLICY "Comments are viewable by everyone"
ON public.comments
FOR SELECT
USING (true);

-- Temporarily disable foreign key constraint for posts.author_id to allow dummy data
ALTER TABLE public.posts DROP CONSTRAINT IF EXISTS posts_author_id_fkey;

-- Insert 12 dummy posts with a placeholder author_id
INSERT INTO public.posts (title, description, type, media_url, thumbnail_url, author_id, published, created_at)
VALUES
  ('Abstract Dreams', 'Exploring the boundaries of reality and imagination through vibrant colors', 'photo', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400', '00000000-0000-0000-0000-000000000000', true, NOW() - INTERVAL '10 days'),
  ('Urban Landscapes', 'Capturing the essence of city life in modern times', 'photo', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400', '00000000-0000-0000-0000-000000000000', true, NOW() - INTERVAL '9 days'),
  ('Nature''s Canvas', 'The raw beauty of untouched wilderness', 'photo', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', '00000000-0000-0000-0000-000000000000', true, NOW() - INTERVAL '8 days'),
  ('Portrait Series', 'Emotional depth captured in human expressions', 'photo', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', '00000000-0000-0000-0000-000000000000', true, NOW() - INTERVAL '7 days'),
  ('Golden Hour Magic', 'The perfect light transforms ordinary scenes', 'photo', 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800', 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=400', '00000000-0000-0000-0000-000000000000', true, NOW() - INTERVAL '6 days'),
  ('Minimalist Beauty', 'Less is more in this exploration of space and form', 'photo', 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800', 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400', '00000000-0000-0000-0000-000000000000', true, NOW() - INTERVAL '5 days'),
  ('Street Photography', 'Candid moments in everyday life', 'photo', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400', '00000000-0000-0000-0000-000000000000', true, NOW() - INTERVAL '4 days'),
  ('Architectural Wonders', 'Modern design meets classical inspiration', 'photo', 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800', 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400', '00000000-0000-0000-0000-000000000000', true, NOW() - INTERVAL '3 days'),
  ('Creative Process', 'Behind the scenes of my latest project', 'video', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400', '00000000-0000-0000-0000-000000000000', true, NOW() - INTERVAL '2 days'),
  ('Time Lapse Creation', 'Watch art come to life in real time', 'video', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=400', '00000000-0000-0000-0000-000000000000', true, NOW() - INTERVAL '1 day'),
  ('Sunset Serenity', 'The peaceful end to a perfect day', 'photo', 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800', 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400', '00000000-0000-0000-0000-000000000000', true, NOW() - INTERVAL '12 hours'),
  ('Digital Art Journey', 'Exploring new dimensions in digital creation', 'photo', 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800', 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400', '00000000-0000-0000-0000-000000000000', true, NOW() - INTERVAL '6 hours');

-- Function to set super admin by email (will be used after user signs up)
CREATE OR REPLACE FUNCTION set_super_admin_by_email(user_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  SELECT id INTO target_user_id FROM auth.users WHERE email = user_email;
  
  IF target_user_id IS NOT NULL THEN
    DELETE FROM public.user_roles WHERE user_id = target_user_id;
    INSERT INTO public.user_roles (user_id, role) VALUES (target_user_id, 'super_admin'::app_role);
  END IF;
END;
$$;