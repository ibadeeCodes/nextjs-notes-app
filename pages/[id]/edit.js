import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { Button, Form, Loader } from 'semantic-ui-react'
import { server } from '../../utils/enviroment'

const Edit = ({ note }) => {
  const [editform, setEditForm] = useState({
    title: note.title,
    description: note.description,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length == 0) {
        editNote()
      } else {
        setIsSubmitting(false)
      }
    }
  }, [errors])

  const handleSubmit = (e) => {
    e.preventDefault()
    let err = validate()
    setErrors(err)
    setIsSubmitting(true)
  }
  const handleChange = (e) => {
    setEditForm({
      ...editform,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
    let err = {}
    if (!editform.title) {
      err.title = 'Please enter a title.'
    }
    if (!editform.title) {
      err.description = 'Please enter description.'
    }
    return err
  }

  const editNote = async () => {
    const noteId = router.query.id
    try {
      const res = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editform),
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='form-container'>
      <h1>Edit Note</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline='centered' />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={
                errors.title
                  ? { content: 'Please enter a title', pointing: 'below' }
                  : null
              }
              label='Title'
              placeholder='Title'
              name='title'
              value={editform.title}
              onChange={handleChange}
            />
            <Form.TextArea
              fluid
              error={
                errors.title
                  ? { content: 'Please enter a title', pointing: 'below' }
                  : null
              }
              label='Description'
              placeholder='Description'
              name='description'
              value={editform.description}
              onChange={handleChange}
            />
            <Button type='submit'>Edit</Button>
          </Form>
        )}
      </div>
    </div>
  )
}

Edit.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`/api/notes/${id}`)
  const { data } = await res.json()
  return { note: data }
}

export default Edit
