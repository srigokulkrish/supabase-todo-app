-- Enable RLS on todo_lists if not already enabled
ALTER TABLE todo_lists ENABLE ROW LEVEL SECURITY;

-- Drop existing update policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Users can update their own lists" ON todo_lists;

-- Create the Update policy
CREATE POLICY "Users can update their own lists"
ON todo_lists
FOR UPDATE
USING (auth.uid() = user_id);

-- Ensure Insert/Select/Delete policies exist (optional, just for safety)
DROP POLICY IF EXISTS "Users can insert their own lists" ON todo_lists;
CREATE POLICY "Users can insert their own lists" ON todo_lists FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own lists" ON todo_lists;
CREATE POLICY "Users can view their own lists" ON todo_lists FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own lists" ON todo_lists;
CREATE POLICY "Users can delete their own lists" ON todo_lists FOR DELETE USING (auth.uid() = user_id);
