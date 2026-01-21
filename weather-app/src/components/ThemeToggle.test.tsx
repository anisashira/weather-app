import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from '../components/ThemeToggle'
import { useThemeStore } from '../store/themeStore'

describe('ThemeToggle Component', () => {
    beforeEach(() => {
        // Reset theme state before each test
        useThemeStore.setState({ isDark: false })
    })

    it('renders the theme toggle button', () => {
        render(<ThemeToggle />)

        const button = screen.getByRole('button', { name: /switch to/i })
        expect(button).toBeInTheDocument()
    })

    it('displays Moon icon in light mode', () => {
        useThemeStore.setState({ isDark: false })
        render(<ThemeToggle />)

        const button = screen.getByLabelText(/switch to dark mode/i)
        expect(button).toBeInTheDocument()
    })

    it('displays Sun icon in dark mode', () => {
        useThemeStore.setState({ isDark: true })
        render(<ThemeToggle />)

        const button = screen.getByLabelText(/switch to light mode/i)
        expect(button).toBeInTheDocument()
    })

    it('toggles theme when clicked', async () => {
        const user = userEvent.setup()
        render(<ThemeToggle />)

        // Initial state - light mode
        expect(useThemeStore.getState().isDark).toBe(false)

        // Click the button
        const button = screen.getByRole('button')
        await user.click(button)

        // Should switch to dark mode
        expect(useThemeStore.getState().isDark).toBe(true)

        // Click again
        await user.click(button)

        // Should switch back to light mode
        expect(useThemeStore.getState().isDark).toBe(false)
    })

    it('applies correct aria-label based on theme', () => {
        // Light mode
        const { rerender } = render(<ThemeToggle />)
        expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument()

        // Switch to dark mode
        useThemeStore.setState({ isDark: true })
        rerender(<ThemeToggle />)
        expect(screen.getByLabelText(/switch to light mode/i)).toBeInTheDocument()
    })
})