import Image from 'next/image'

export async function HeaderLogo() {
  return (
    <div className="flex items-center">
      <Image
        src={'/blackbox-logo-dark.png'}
        width={152}
        height={34}
        alt="blackbox-logo"
        className="hidden dark:flex"
      />
      <Image
        src={'/blackbox-logo-light.png'}
        width={152}
        height={34}
        alt="blackbox-logo"
        className="flex dark:hidden"
      />
    </div>
  )
}
