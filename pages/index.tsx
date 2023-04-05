import { useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Input, Button, Link, Text, Loading } from '@nextui-org/react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  const submitEmail = async (e: any) => {
    e.preventDefault()
    const email = e.target[0].value
    setLoading(true)
    const res = await fetch(process.env.NEXT_PUBLIC_CALENDAR_API_URL + email, {
      method: 'GET',
    })
    setLoading(false)

    if (!res.ok) {
      setSuccess(false)
      return
    } else {
      setSuccess(true)
    }

    const data = await res.text()
    const filename = 'epicalendar.ics'
    const blob = new Blob([data], { type: 'text/calendar;charset=utf-8' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <Head>
        <title>EpiCalendar</title>
        <meta name="description" content="EpiCalendar main page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <Text h1>Please submit your email to get your iCal file</Text>
          <form className={styles.form} onSubmit={submitEmail}>
            <Input labelPlaceholder="Email" type='email' size={'xl'} />
            <Button type="submit" auto bordered size={"lg"}>
              {loading ? <Loading type="points"/> : 'Submit'}
            </Button>
          </form>
          {success === false ?
          (<Text h5 color="error">Something went wrong, please try again later</Text>) :
          success === true ? (<Text h5 color="success">Your calendar is ready, the download should have started</Text>)
          : null}
        </div>
        <div className={styles.footer}>
          <Text h5>Want to understand what this website is for? &nbsp;
            <Link href="https://github.com/Sinan-Karakaya/EpiCalendar" isExternal>Click here</Link>
          </Text >
        </div>
      </main>
    </>
  )
}
