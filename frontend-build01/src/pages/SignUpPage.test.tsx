import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import SignUpPage from '../pages/SignUpPage'

HTMLCanvasElement.prototype.getContext = () => null

const renderPage = () =>
  render(
    <MemoryRouter>
      <SignUpPage />
    </MemoryRouter>
  )

describe('SignUpPage', () => {
  it('renders the page heading', () => {
    renderPage()
    expect(screen.getByText(/create an account/i)).toBeInTheDocument()
  })

  it('renders first name and last name inputs', () => {
    renderPage()
    expect(screen.getByPlaceholderText('John')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument()
  })

  it('renders the email input', () => {
    renderPage()
    expect(screen.getByPlaceholderText('name@company.com')).toBeInTheDocument()
  })

  it('renders the password input', () => {
    renderPage()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
  })

  it('renders the Create Account submit button', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('renders Google and Apple OAuth buttons', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /apple/i })).toBeInTheDocument()
  })

  it('renders the sign in link for existing users', () => {
    renderPage()
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument()
  })
})
