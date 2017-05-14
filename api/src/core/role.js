const shuffleArr = array => {
  let i = 0
  let j = 0
  let temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const defaultRole = {
  doctor: 1,
  seer: 1,
  werewolf: 1
}

// Randomize Roles (requirement, player count)
export default (req = defaultRole, players) => {
  // Get the Crucial (Non-Villager) Roles
  const crucials = Object.keys(req).reduce((roles, role) => {
    return roles.concat([...Array(req[role])].map(() => role))
  }, [])

  // All Roles = Villagers (Non-Crucial) + Crucial Roles
  const crucial = Object.values(req).reduce((a, b) => a + b, 0)
  const roles = [...Array(players - crucial)].map(() => "villager").concat(crucials)

  shuffleArr(roles)
  return roles
}
