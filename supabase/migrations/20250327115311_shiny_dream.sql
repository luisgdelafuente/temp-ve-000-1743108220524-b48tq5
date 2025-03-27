/*
  # Fix RLS policies for leads table
  
  1. Changes
    - Drop existing RLS policies
    - Create new policies with proper validation
    - Allow public users to insert leads with email validation
    - Allow authenticated users to read and update leads
    - Add proper WITH CHECK clause for public inserts

  2. Security
    - Maintain email format validation
    - Ensure required fields are present
    - Prevent unauthorized access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public to insert leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated users to read leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated users to update leads" ON leads;

-- Create new policies with proper security rules
CREATE POLICY "Enable public inserts for leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (
    -- Validate required fields
    type IS NOT NULL AND
    name IS NOT NULL AND
    email IS NOT NULL AND
    message IS NOT NULL AND
    -- Validate email format
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

CREATE POLICY "Enable read access for authenticated users"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable update access for authenticated users"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);