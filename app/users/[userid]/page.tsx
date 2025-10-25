interface userIdpageProps {
  params: Promise<{
    userid: string;
  }>;
}
async function page({ params }: userIdpageProps) {
  const {userid} = await params;
  return <div>user id : {userid}</div>;
}

export default page;