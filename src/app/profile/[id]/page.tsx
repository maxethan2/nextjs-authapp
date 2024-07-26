type Params = {
  params: {
    id: string
  }
}

export default function UserProfile({params: { id }}: Params) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">{id}</p>
    </div>
  )
}