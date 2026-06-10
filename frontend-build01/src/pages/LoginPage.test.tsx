import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

// jsdom doesn't support WebGL — mock it so the canvas hook doesn't crash
HTMLCanvasElement.prototype.getContext = () => null

const renderPage = () =>
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  )

describe('LoginPage', () => {
  it('renders the ParkFlow brand name', () => {
    renderPage()
    expect(screen.getByText('ParkFlow')).toBeInTheDocument()
  })

  it('renders email and password inputs', () => {
    renderPage()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('renders the Sign In button', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders Google and Apple OAuth buttons', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /apple/i })).toBeInTheDocument()
  })

  it('renders the forgot password link', () => {
    renderPage()
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument()
  })

  it('renders the signup link', () => {
    renderPage()
    expect(screen.getByText(/signup for parkflow/i)).toBeInTheDocument()
  })
})
