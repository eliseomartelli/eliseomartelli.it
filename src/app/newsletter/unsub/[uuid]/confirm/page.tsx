import { Article } from "@/components/Article";
import { Newsletter } from "@/components/Newsletter";
import { PageLayout } from "@/components/PageLayout";
import WidthLimit from "@/components/WidthLimit";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

const Page = async ({ params }: { params: { uuid: string } }) => {
  try {
    await prisma.subscriber.delete({
      where: {
        unsub: params.uuid,
      },
    });
  } catch (error) {
    notFound();
  }
  return (
    <>
      <PageLayout
        routes={[
          {
            name: "Sad to see you go!",
            href: "",
          },
        ]}
      >
        <Article>You are welcome to re-subscribe at any time!</Article>
      </PageLayout>
      <WidthLimit>
        <Newsletter />
      </WidthLimit>
    </>
  );
};

export default Page;
