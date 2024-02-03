export function checkListen(listen, conditions) {
  if (listen.key !== conditions.key) return false
  if (conditions.name && listen.name !== conditions.name) return false

  for (const [keyPath, expectedValue] of Object.entries(conditions.value)) {
    const actualValue = listen.value[keyPath]
    if (actualValue !== expectedValue) return false
  }
  return true
}
