-- Script 039: Add RLS policies for conversations and messages tables

-- Enable RLS on conversations table
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- RLS policies for conversations
DO $$
BEGIN
  -- SELECT policy for conversations
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'conversations'
      AND policyname = 'Authenticated can read conversations'
  ) THEN
    EXECUTE 'CREATE POLICY "Authenticated can read conversations"
      ON public.conversations
      FOR SELECT
      USING (auth.role() = ''authenticated'')';
  END IF;

  -- INSERT policy for conversations
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'conversations'
      AND policyname = 'Authenticated can insert conversations'
  ) THEN
    EXECUTE 'CREATE POLICY "Authenticated can insert conversations"
      ON public.conversations
      FOR INSERT
      WITH CHECK (auth.role() = ''authenticated'')';
  END IF;

  -- UPDATE policy for conversations
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'conversations'
      AND policyname = 'Authenticated can update conversations'
  ) THEN
    EXECUTE 'CREATE POLICY "Authenticated can update conversations"
      ON public.conversations
      FOR UPDATE
      USING (auth.role() = ''authenticated'')';
  END IF;
END $$;

-- RLS policies for messages (add INSERT and UPDATE)
DO $$
BEGIN
  -- SELECT policy for messages (anon)
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'messages'
      AND policyname = 'Anon can read messages'
  ) THEN
    EXECUTE 'CREATE POLICY "Anon can read messages"
      ON public.messages
      FOR SELECT
      USING (auth.role() = ''anon'')';
  END IF;

  -- INSERT policy for messages (anon)
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'messages'
      AND policyname = 'Anon can insert messages'
  ) THEN
    EXECUTE 'CREATE POLICY "Anon can insert messages"
      ON public.messages
      FOR INSERT
      WITH CHECK (auth.role() = ''anon'')';
  END IF;

  -- UPDATE policy for messages (anon)
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'messages'
      AND policyname = 'Anon can update messages'
  ) THEN
    EXECUTE 'CREATE POLICY "Anon can update messages"
      ON public.messages
      FOR UPDATE
      USING (auth.role() = ''anon'')';
  END IF;

  -- INSERT policy for messages
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'messages'
      AND policyname = 'Authenticated can insert messages'
  ) THEN
    EXECUTE 'CREATE POLICY "Authenticated can insert messages"
      ON public.messages
      FOR INSERT
      WITH CHECK (auth.role() = ''authenticated'')';
  END IF;

  -- UPDATE policy for messages
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'messages'
      AND policyname = 'Authenticated can update messages'
  ) THEN
    EXECUTE 'CREATE POLICY "Authenticated can update messages"
      ON public.messages
      FOR UPDATE
      USING (auth.role() = ''authenticated'')';
  END IF;
END $$;

-- RLS policies for conversations (anon)
DO $$
BEGIN
  -- SELECT policy for conversations (anon)
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'conversations'
      AND policyname = 'Anon can read conversations'
  ) THEN
    EXECUTE 'CREATE POLICY "Anon can read conversations"
      ON public.conversations
      FOR SELECT
      USING (auth.role() = ''anon'')';
  END IF;

  -- INSERT policy for conversations (anon)
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'conversations'
      AND policyname = 'Anon can insert conversations'
  ) THEN
    EXECUTE 'CREATE POLICY "Anon can insert conversations"
      ON public.conversations
      FOR INSERT
      WITH CHECK (auth.role() = ''anon'')';
  END IF;

  -- UPDATE policy for conversations (anon)
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'conversations'
      AND policyname = 'Anon can update conversations'
  ) THEN
    EXECUTE 'CREATE POLICY "Anon can update conversations"
      ON public.conversations
      FOR UPDATE
      USING (auth.role() = ''anon'')';
  END IF;
END $$;