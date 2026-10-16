// تأكد من أن مكتبة Supabase تم تحميلها أولاً
if (typeof window.supabase !== 'undefined') {
    const SUPABASE_URL = 'https://tdrobqystlhiggvvwywr.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_6r2pYR_s6RM8a9vgQoL9Ww_-pQ_QpHC';
    
    // تعريف المتغير ليصبح متاحاً لجميع الملفات
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('✅ تم إنشاء supabaseClient بنجاح');
} else {
    console.error('❌ مكتبة Supabase لم يتم تحميلها!');
}