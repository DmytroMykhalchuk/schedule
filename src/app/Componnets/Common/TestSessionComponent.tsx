import { nextAuthConfig } from "@/configs/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

type TestSessionComponentType = {
};

export const TestSessionComponent: React.FC<TestSessionComponentType> = async ({ }) => {
    const session = await getServerSession(nextAuthConfig);

    console.log(session);
    return (
        <>
            <div>
                {
                    session?.user?.image && session?.user?.name && <Image src={session?.user?.image} alt={session?.user?.name} width={200} height={200}/>
                }
            </div>
        </>
    );
};