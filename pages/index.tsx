import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { marked } from 'marked'
import parse from 'html-react-parser'

const Home: NextPage = () => {
  const router = useRouter()
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (router.query.url) {
      fetch(router.query.url)
        .then((data) => data.text())
        .then((text) => setValue(text))
        .catch((err) => console.error(err))
    }
  }, [router.query.url])

  return (
    <div>
      <Head>
        <title>GTex</title>
      </Head>

      <main>
        <article className="markdown-body">
          {!value ? (
            <>
              <h1>How to use?</h1>
              <p>Add url query at the end of url just like this</p>
              <pre>
                <code>https://example.com?url=&lt;YOUR_MARKDOWN_LINK&gt;</code>
              </pre>
              <p>
                Still get stuck?&nbsp;
                <Link
                  href="/?url=https://raw.githubusercontent.com/toufiqnuur/toufiqnuur/main/README.md"
                  replace>
                  <a>Try the example</a>
                </Link>
              </p>
            </>
          ) : (
            <>{parse(marked.parse(value))}</>
          )}
        </article>
      </main>
    </div>
  )
}

export default Home
