import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'

HTMLCanvasElement.prototype.getContext = () => null

const renderPage = () =>
  render(
    <MemoryRouter>
      <ForgotPasswordPage />
    </MemoryRouter>
  )

describe('ForgotPasswordPage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the reset password heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /reset your password/i })).toBeInTheDocument()
  })

  it('renders the email input', () => {
    renderPage()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
  })

  it('renders the Send Reset Link button', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument()
  })

  it('does not submit when email is empty', () => {
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }))
    // Form has required attribute — confirmation screen should NOT appear
    expect(screen.queryByText(/check your inbox/i)).not.toBeInTheDocument()
  })

  it('shows confirmation screen after submitting a valid email', async () => {
    renderPage()

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.submit(screen.getByRole('button', { name: /send reset link/i }).closest('form')!)

    // Simulate the 1200ms timeout
    await act(async () => {
      vi.advanceTimersByTime(1200)
    })

    expect(screen.getByText(/check your inbox/i)).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('shows the submitted email address in the confirmation screen', async () => {
    renderPage()

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'rishabh@parkflow.com' },
    })
    fireEvent.submit(screen.getByRole('button', { name: /send reset link/i }).closest('form')!)

    await act(async () => {
      vi.advanceTimersByTime(1200)
    })

    expect(screen.getByText('rishabh@parkflow.com')).toBeInTheDocument()
  })

  it('goes back to the form when "try another address" is clicked', async () => {
    renderPage()

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.submit(screen.getByRole('button', { name: /send reset link/i }).closest('form')!)

    await act(async () => {
      vi.advanceTimersByTime(1200)
    })

    fireEvent.click(screen.getByText(/try another address/i))
    expect(screen.getByRole('heading', { name: /reset your password/i })).toBeInTheDocument()
  })
})
