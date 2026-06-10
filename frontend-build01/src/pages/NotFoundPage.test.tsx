import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage'

// 1. Define the mock variable at the top-level scope using the 'vi' prefix
const viNavigate = vi.fn()

// 2. Mock 'react-router-dom' globally at the file level so Vitest can safely hoist it
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: () => viNavigate,
  }
})

const renderPage = () =>
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  )

describe('NotFoundPage', () => {
  // Clear the mock calls before each test to ensure clean test isolation
  beforeEach(() => {
    vi.clearAllMocks()
  })

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
    renderPage()
    
    // Click the button
    fireEvent.click(screen.getByRole('button', { name: /go back/i }))
    
    // Assert against our top-level 'vi' prefixed mock
    expect(viNavigate).toHaveBeenCalledWith(-1)
  })
})