/*
  # Fix RLS policies for leads table
  
  1. Changes
    - Drop existing RLS policies
    - Create new policies with proper security rules
    - Enable public inserts with proper validation
    - Restrict read/update access to authenticated users only

  2. Security
    - Allow public users to insert new leads
    - Allow authenticated users to read and update leads
    - Prevent unauthorized access to sensitive data
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON leads;
DROP POLICY IF EXISTS "Enable insert access for all users" ON leads;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON leads;

-- Create new policies with proper security rules
CREATE POLICY "Allow public to insert leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (
    -- Basic validation
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
    type IS NOT NULL AND
    name IS NOT NULL AND
    message IS NOT NULL
  );

CREATE POLICY "Allow authenticated users to read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);