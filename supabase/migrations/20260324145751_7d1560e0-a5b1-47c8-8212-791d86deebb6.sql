-- Waitlist signups table
CREATE TABLE public.waitlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  referral_code TEXT NOT NULL,
  goal TEXT NOT NULL,
  referred_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public waitlist)
CREATE POLICY "Anyone can sign up" ON public.waitlist_signups
  FOR INSERT WITH CHECK (true);

-- Anyone can read (needed for position/referral counts)
CREATE POLICY "Anyone can read signups" ON public.waitlist_signups
  FOR SELECT USING (true);