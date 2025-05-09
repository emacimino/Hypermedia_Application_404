import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://jrwkgoigicrlgkiszuuc.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyd2tnb2lnaWNybGdraXN6dXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NzgyMDQsImV4cCI6MjA2MjM1NDIwNH0.oIVFzC70ZXI-veDnUpDQR824uC3qxiBm3eR5C8_yQEU";
export const supabase = createClient(supabaseUrl,supabaseKey);