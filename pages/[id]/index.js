import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { server } from '../../utils/enviroment'
import { Button, Confirm, Loader } from 'semantic-ui-react'
import { useRouter } from 'next/router'

const Index = ({ note }) => {
  const [confirm, setConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isDeleting) {
      deleteNote()
    }
  }, [isDeleting])

  const open = () => {
    setConfirm(true)
  }

  const close = () => {
    setConfirm(false)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    close()
  }

  const deleteNote = async () => {
    const noteId = router.query.id
    try {
      const res = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='note-container'>
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button color='red' onClick={open}>
            Delete
          </Button>
          <Confirm
            open={confirm}
            onCancel={close}
            onConfirm={handleDelete}
          ></Confirm>
        </>
      )}
    </div>
  )
}

Index.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`/api/notes/${id}`)
  const { data } = await res.json()
  return { note: data }
}

export default Index
