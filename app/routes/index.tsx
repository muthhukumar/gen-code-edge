import type {MetaFunction} from 'remix'
import {Link} from 'react-router-dom'

export let meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  }
}

export default function Index() {
  return (
    <div style={{textAlign: 'center', padding: 20}}>
      <h2>Welcome to Remix!</h2>
      <p>
        <a href="https://docs.remix.run">Check out the docs</a> to get started.
      </p>
      <p>
        <Link to="not-found">Link to 404 not found page.</Link> Clicking this link will land you in
        your root CatchBoundary component.
      </p>
    </div>
  )
}
