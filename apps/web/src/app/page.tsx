import { createClient } from '@/utils/supabase/server';
import { Member, ROLES } from '@sacco/core';
import Link from 'next/link';
import { signOut } from './auth/actions';
import Sidebar from '@/components/layout/Sidebar';
import { getUserRole } from '@/utils/rbac';
import { redirect } from 'next/navigation';

async function getMembers(): Promise<Member[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('members')
    .select('*');

  if (error) {
    console.error('Error fetching members:', error);
    return [];
  }

  return (data as any[])?.map(m => ({
    ...m,
    created_at: new Date(m.created_at),
    updated_at: new Date(m.updated_at),
    deleted_at: m.deleted_at ? new Date(m.deleted_at) : undefined,
  })) as Member[];
}

export default async function MembersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const role = user ? await getUserRole(user.id) : null;
  const members = await getMembers();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {user && role && <Sidebar role={role} />}
      
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b flex justify-between items-center bg-white px-8 shadow-sm">
          <div className="flex items-center gap-4">
            {!user && <h2 className="text-xl font-bold text-indigo-700">saccoOs</h2>}
            {user && <span className="text-sm font-medium text-gray-500 italic">Welcome back!</span>}
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900">{user.email}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{role?.replace('_', ' ')}</p>
                </div>
                <form action={signOut}>
                  <button className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors font-medium border border-red-200">
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors font-medium">
                  Login
                </Link>
                <Link href="/signup" className="text-sm bg-indigo-700 text-white hover:bg-indigo-800 px-4 py-2 rounded-md transition-colors font-medium shadow-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </header>

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Members Directory</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and view all registered SACCO members.</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Database Schema</span>
              <code className="bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200 text-xs font-mono">sacco.*</code>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Member ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic text-sm">
                      No members found in the database.
                    </td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr key={member.id} className="hover:bg-blue-50/30 transition-colors cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {member.first_name} {member.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        {member.member_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {member.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          member.status === 'active' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : member.status === 'suspended'
                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            member.status === 'active' ? 'bg-green-500' : member.status === 'suspended' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></span>
                          {member.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
