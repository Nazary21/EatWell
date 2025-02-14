import { supabase } from './supabase';

export const testSupabaseConnection = async () => {
  try {
    // Test authentication system
    const { data: authData, error: authError } = await supabase.auth.getSession();

    if (authError) {
      console.error('Auth system test failed:', authError.message);
      return { success: false, error: authError.message };
    }

    // Test basic connection with a simple query
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    // If we get a "relation does not exist" error, it means we're connected but tables aren't set up
    if (error && error.message.includes('relation "public.users" does not exist')) {
      return { 
        success: true, 
        message: 'Supabase connection successful, but database tables need to be created',
        warning: 'Database tables not found'
      };
    }

    if (error) {
      console.error('Database connection test failed:', error.message);
      return { success: false, error: error.message };
    }

    return { 
      success: true, 
      message: 'Supabase connection and database working correctly',
      dbData: data,
      authData
    };
  } catch (error) {
    console.error('Unexpected error during Supabase test:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}; 