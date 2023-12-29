type ClassArgument = string | [boolean, string, string] | [boolean, string]

/**
 *
 * @description Vous pouvez utiliser cette fonction pour générer des classes dynamiquement. Vous pouvez utiliser des tableaux pour générer des classes conditionnelles, par exemple: `dc(['condition', 'class-true', 'class-false'])` ou `dc(['condition', 'class-true'])`. Vous pouvez également utiliser des chaînes de caractères pour générer des classes statiques, par exemple: `dc('class-true')`. Il est possible d'utiliser plusieurs arguments, par exemple: `dc('class-true', ['condition', 'class-true', 'class-false'], ['condition', 'class-true'])`.
 * @param classNames
 * @returns string
 *
 */
export function dc(...classNames: ClassArgument[]): string {
  const classes: string[] = []

  classNames.forEach((className) => {
    if (Array.isArray(className)) {
      if (className.length === 2) {
        const [condition, trueClass] = className
        if (condition) classes.push(trueClass)
      } else {
        const [condition, trueClass, falseClass] = className
        classes.push(condition ? trueClass : falseClass)
      }
    } else {
      classes.push(className)
    }
  })

  return classes.join(' ')
}
