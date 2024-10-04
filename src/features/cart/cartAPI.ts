// A mock function to mimic making an async request for data
export const fetchCount = (amount = 1) => {
  return new Promise<{ data: number }>(resolve => {
    const response: any = fetch("http://localhost:5173")
    resolve(response.data)
  })
}
