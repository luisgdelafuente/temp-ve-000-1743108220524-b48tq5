/*
  # Create leads table for contact form submissions
  
  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `type` (text) - Type of contact request
      - `name` (text) - Contact name
      - `email` (text) - Contact email
      - `message` (text) - Contact message
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      - `status` (text) - Lead status (new, contacted, converted, archived)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for authenticated users to manage leads
    - Add policy for public users to create leads (contact form submissions)

  3. Changes
    - Add indexes for common queries
    - Add status validation using enum
*/

-- Create enum for lead status
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'converted', 'archived');

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  status lead_status DEFAULT 'new'::lead_status,
  
  -- Add validation
  CONSTRAINT leads_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes
CREATE INDEX leads_status_idx ON leads (status);
CREATE INDEX leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX leads_email_idx ON leads (email);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users" 
  ON leads
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Enable insert access for all users" 
  ON leads
  FOR INSERT 
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" 
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE
  ON leads
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();