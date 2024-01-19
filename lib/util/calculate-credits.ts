export default function calculateCredits(customer: any) {
  let total = 0
  let remaining = 0
  if (customer?.metadata?.api_quota) {
    total = customer?.metadata?.api_quota as number
    if (customer?.metadata?.api_count) {
      remaining =
        (customer?.metadata?.api_quota as number) -
        (customer?.metadata?.api_count as number)
    } else {
      remaining = customer?.metadata?.api_quota as number
    }
  }
  return { total, remaining }
}
