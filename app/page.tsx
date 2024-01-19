import Footer from "@modules/footer"
import Header from "@modules/header"
import Imagine from "./Imagine"

// TODO: add supabase to make session call to get auth user

const getSession = async () => {
  return {
    access_token: "123",
  }
}

export default async function Home() {
  const [session] = await Promise.all([getSession()])

  return (
    <div className="">
      <Header />
      <div className="container bg-white dark:bg-black">
        <Imagine session={session} />
      </div>
      <Footer />
    </div>
  )
}
