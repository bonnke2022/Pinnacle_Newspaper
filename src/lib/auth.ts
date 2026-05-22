import {cookies} from 'next/headers'

export async function isAdminAuthenticated() {
  try {
    const jar = await cookies()
    return jar.get('admin_token')?.value === process.env.ADMIN_SECRET
  } catch {
    return false
  }
}
