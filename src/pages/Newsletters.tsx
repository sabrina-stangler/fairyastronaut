import { useEffect, useMemo, useState } from 'react'
import TheFairyTimesLogo from '../assets/tft-logo-andrew-heavy.svg'
import NewsletterMedia from '../components/NewsletterMedia'
import { getNewsletterShorthand, newsletters } from '../data/newsletters'
import { getUpcomingDatesForNewsletter } from '../data/upcomingDates'
import type { Newsletter } from '../types/newsletter'

function Newsletters() {
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter>(
    newsletters[0],
  )

  useEffect(() => {
    // Disable animation after first mount
    const timer = setTimeout(() => setShouldAnimate(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Dynamically get upcoming dates for the selected newsletter
  const upcomingDates = useMemo(
    () =>
      getUpcomingDatesForNewsletter(
        selectedNewsletter.month,
        selectedNewsletter.year,
      ),
    [selectedNewsletter.month, selectedNewsletter.year],
  )

  return (
    <div className={`p-4 ${shouldAnimate ? 'page-content-enter' : ''}`}>
      {/* Header - responsive layout */}
      {/* Mobile: stacked center-aligned, Desktop: space-between row */}
      <div className='flex flex-col items-center gap-4 pt-2 md:flex-row md:justify-between md:pb-0 md:pl-2 bg-black text-white'>
        {/* Left side - Logo */}
        <div className='pl-4 relative'>
          <select
            value={`${selectedNewsletter.year}-${selectedNewsletter.month}`}
            onChange={(e) => {
              const [year, month] = e.target.value.split('-').map(Number)
              const newsletter = newsletters.find(
                (n) => n.year === year && n.month === month,
              )
              if (newsletter) setSelectedNewsletter(newsletter)
            }}
            className='appearance-none bg-transparent text-base cursor-pointer pr-6 focus:outline-none'
          >
            {newsletters.map((newsletter) => (
              <option
                key={`${newsletter.year}-${newsletter.month}`}
                value={`${newsletter.year}-${newsletter.month}`}
              >
                {getNewsletterShorthand(newsletter)}
              </option>
            ))}
          </select>
          {/* Down arrow */}
          <svg
            className='absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
        <img
          className='w-90 h-auto object-contain invert'
          src={TheFairyTimesLogo}
          alt='The Fairy Times Logo'
        />
      </div>
      <div className='border-b-4 my-4 md:my-0 md:mb-4'></div>

      {/* Current Newsletter Display */}
      <div>
        {/* Newsletter Media - Newspaper Column Layout */}
        <div className='flex flex-wrap gap-4'>
          {selectedNewsletter.media.map((mediaItem) => (
            <NewsletterMedia
              key={mediaItem.title || mediaItem.image || mediaItem.video}
              media={mediaItem}
            />
          ))}
        </div>

        {/* Upcoming Dates Table */}
        {upcomingDates && upcomingDates.length > 0 && (
          <div className='mt-8'>
            <h3 className='text-xl mb-3 p-2 bg-black text-white'>
              Upcoming Dates
            </h3>
            <table className='w-full'>
              <tbody>
                {upcomingDates.map((event, index) => (
                  <tr key={index} className='hover:bg-yellow-100'>
                    <td className='px-4 py-2 flex flex-col'>
                      <span>{event.date.toLocaleDateString()}</span>
                      <span>{event.type}</span>
                    </td>
                    <td className='px-4 py-2'>{event.title}</td>
                    <td className='px-4 py-2'>{event.location || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Newsletters
