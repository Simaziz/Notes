import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function NotesPage() {
  const session = await getServerSession(authOptions);

  // Redirect to login if the user is not authenticated
  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Your Notes</h1>
      <p>Welcome, {session.user.email}!</p>
      {/* Add your notes display logic here */}
    </div>
  );
}