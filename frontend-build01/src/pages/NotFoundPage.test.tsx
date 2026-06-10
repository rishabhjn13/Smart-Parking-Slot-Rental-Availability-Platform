import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage'

const renderPage = () =>
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  )

describe('NotFoundPage', () => {
  it('renders the 404 heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
  })

  it('renders the Return to Dashboard link', () => {
    renderPage()
    expect(screen.getByRole('link', { name: /return to dashboard/i })).toBeInTheDocument()
  })

  it('renders the Go Back button', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument()
  })

  it('calls navigate(-1) when Go Back is clicked', () => {
    const mockNavigate = vi.fn()
    vi.mock('react-router-dom', async (importOriginal) => ({
      ...(await importOriginal<typeof import('react-router-dom')>()),
      useNavigate: () => mockNavigate,
    }))

    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /go back/i }))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
