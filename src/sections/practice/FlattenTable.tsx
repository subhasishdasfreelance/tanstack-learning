const testData = [
  {
    id: 1,
    children: [
      {
        id: 2,
      },
    ],
  },
  {
    id: 3,
    children: [
      {
        id: 4,
        children: [
          {
            id: 5,
            children: [
              {
                id: 2,
                children: [
                  {
                    id: 6,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

const flatten = (data: any) => {
  const foundIds: number[] = []

  data.forEach((item: any) => {
    if (!item.id) {
      return
    }

    if (!item.children) {
      foundIds.push(item.id)
      return
    }

    foundIds.push(item.id, ...flatten(item.children))
  })

  return foundIds
}

export default function FlattenTable() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4">FlattenTable</div>
    </div>
  )
}
