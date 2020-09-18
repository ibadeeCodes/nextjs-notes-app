import React from 'react'
import fetch from 'isomorphic-unfetch'
import { server } from '../utils/enviroment'
import { Card, Button } from 'semantic-ui-react'
import Link from 'next/link'

const Index = ({ notes }) => {
  return (
    <div className='notes-container'>
      <h1>My Notes</h1>
      <div className='grid wrapper'>
        {notes.data.map((note) => {
          return (
            <div key={note._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                      <a>{note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${note._id}/edit`}>
                    <Button secondary>Edit</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  const data = await fetch(`${server}/api/notes`)
  const result = await data.json()
  return {
    notes: result,
  }
}

export default Index
