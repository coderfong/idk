import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  console.log(`Accessing transformation type: ${type}`);
  const { userId } = auth();
  console.log(`Clerk userId: ${userId}`);

  if(!userId) {
    console.log('No userId, redirecting to sign-in');
    redirect('/sign-in');
  }
  
  const transformation = transformationTypes[type];
  console.log(`Transformation: ${JSON.stringify(transformation)}`);

  const user = await getUserById(userId);
  console.log(`User from database: ${JSON.stringify(user)}`);

  if (!user) {
    console.log(`User not found in database for Clerk ID: ${userId}`);
    // Handle the case where the user is not found
    return <div>User not found. Please try signing out and in again.</div>;
  }

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage