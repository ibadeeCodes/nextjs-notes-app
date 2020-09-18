import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { Button, Form, Loader } from 'semantic-ui-react'
import { server } from '../utils/enviroment'

const New = () => {
  const [form, setForm] = useState({ title: '', description: '' })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length == 0) {
        createNote()
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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
    let err = {}
    if (!form.title) {
      err.title = 'Please enter a title.'
    }
    if (!form.title) {
      err.description = 'Please enter description.'
    }
    return err
  }

  const createNote = async () => {
    try {
      const res = await fetch(`${server}/api/notes`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      router.push(`${server}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='form-container'>
      <h1>Create Note</h1>
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
              value={form.title}
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
              value={form.description}
              onChange={handleChange}
            />
            <Button type='submit'>Create</Button>
          </Form>
        )}
      </div>
    </div>
  )
}

export default New
