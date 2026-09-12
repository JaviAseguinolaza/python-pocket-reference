// Contenido del manual. UI en español, código e identificadores en inglés.
// Tipos de bloque:
//   { type: "p",     text }                 — párrafo (soporta `code` y **bold**)
//   { type: "code",  code, title?, run? }   — código con botones Copiar / Probar
//   { type: "note",  tone, title?, text }   — tip | warning | info | key
//   { type: "list",  title?, items }        — viñetas (soporta `code`)
//   { type: "table", caption?, headers, rows }
//   { type: "h",     text }                 — subsección (aparece en el índice)

export const categories = [
  {
    id: "fundamentos",
    title: "Fundamentos",
    short: "Las piezas básicas",
    blurb:
      "Variables, tipos, números, conversiones y cómo pedirle datos al usuario. El punto de partida de todo.",
    icon: "box",
    en: {
      title: "Basics",
      short: "The building blocks",
      blurb:
        "Variables, types, numbers, conversions and how to ask the user for data. The starting point of everything.",
    },
    topics: [
      {
        id: "variables",
        title: "Variables y asignación",
        desc: "Guardar valores con nombres que se lean solos.",
        en: { title: "Variables and assignment", desc: "Store values under names that read themselves." },
        blocks: [
          {
            type: "p",
            text:
              "Una variable es un nombre que apunta a un valor en memoria. En Python no se declara el tipo: el mismo nombre puede empezar apuntando a un número y terminar en una cadena.",
            en: {
              text:
                "A variable is a name that points to a value in memory. Python does not declare types: the same name can start pointing to a number and end up as a string.",
            },
          },
          {
            type: "code",
            title: "Asignación",
            code: `edad = 25
nombre = "Ana"
pi = 3.1416
es_alumno = True

# Reasignar es igual de fácil
edad = 26
edad = "veintiséis"   # Python no protesta (aunque no suele ser buena idea)`,
            en: {
              title: "Assignment",
              code: `age = 25
name = "Ana"
pi = 3.1416
is_student = True

# Reassigning is just as easy
age = 26
age = "twenty-six"   # Python doesn't complain (though it's rarely a good idea)`,
            },
          },
          {
            type: "note",
            tone: "warning",
            title: "Cuidado con el signo",
            text:
              "`=` asigna un valor; `==` compara. Confundirlos es uno de los errores más típicos.",
            en: {
              title: "Watch the sign",
              text:
                "`=` assigns a value; `==` compares. Mixing them up is one of the most common mistakes.",
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Escribe nombres que se lean",
            text:
              "`precio_total` se entiende sola; `pt` no. Dedicar un segundo a nombrar bien ahorra horas después.",
            en: {
              title: "Write names that read well",
              text:
                "`total_price` is self-explanatory; `tp` is not. Spending a second on good names saves hours later.",
            },
          },
        ],
        quiz: [
          {
            q: "¿Qué hace `edad = \"veintiséis\"` si antes `edad = 25`?",
            options: [
              "Da un error de tipo",
              "Reasigna `edad` a la cadena y Python no protesta",
              "Crea una variable distinta",
              "Convierte la cadena en número",
            ],
            answer: 1,
            explain:
              "Python no declara tipos: reasignar a otro tipo es válido, aunque rara vez es buena idea.",
            en: {
              q: "What does `age = \"twenty-six\"` do if `age = 25` came first?",
              options: [
                "It raises a type error",
                "It reassigns `age` to the string and Python doesn't complain",
                "It creates a different variable",
                "It converts the string to a number",
              ],
              explain:
                "Python does not declare types: reassigning to another type is valid, though rarely a good idea.",
            },
          },
          {
            q: "¿Qué operador compara dos valores?",
            options: ["=", "==", ":=", "!"],
            answer: 1,
            explain: "`=` asigna un valor; `==` compara dos valores.",
            en: {
              q: "Which operator compares two values?",
              options: ["=", "==", ":=", "!"],
              explain: "`=` assigns a value; `==` compares two values.",
            },
          },
          {
            q: "¿Cuál de estos nombres de variable es el más legible?",
            options: ["pt", "precio_total", "P", "x1"],
            answer: 1,
            explain:
              "`precio_total` se entiende sola; los nombres cortos crípticos obligan a leer todo el código.",
            en: {
              q: "Which of these variable names is the most readable?",
              options: ["tp", "total_price", "P", "x1"],
              explain:
                "`total_price` is self-explanatory; short cryptic names force you to read the whole codebase.",
            },
          },
        ],
      },
      {
        id: "tipos",
        title: "Tipos de datos",
        desc: "Todo valor es un objeto con un tipo: int, float, str, bool, list...",
        en: {
          title: "Data types",
          desc: "Every value is an object with a type: int, float, str, bool, list...",
        },
        blocks: [
          {
            type: "p",
            text:
              "Todo valor en Python tiene un tipo. Estos son los básicos que usarás todos los días:",
            en: {
              text:
                "Every value in Python has a type. These are the basics you'll use every day:",
            },
          },
          {
            type: "table",
            caption: "Tipos elementales",
            headers: ["Tipo", "Ejemplo", "Qué es"],
            rows: [
              ["int", "42", "Números enteros"],
              ["float", "3.14", "Números decimales"],
              ["str", "'hola'", "Texto (cadenas)"],
              ["bool", "True / False", "Verdadero o falso"],
              ["list", "[1, 2, 3]", "Lista ordenada y modificable"],
              ["tuple", "(1, 2, 3)", "Lista inmutable"],
              ["dict", "{'clave': 1}", "Pares clave -> valor"],
              ["set", "{1, 2, 3}", "Colección sin repetidos"],
              ["NoneType", "None", "La nada, ausencia de valor"],
            ],
            en: {
              caption: "Basic types",
              headers: ["Type", "Example", "What it is"],
              rows: [
                ["int", "42", "Whole numbers"],
                ["float", "3.14", "Decimal numbers"],
                ["str", "'hola'", "Text (strings)"],
                ["bool", "True / False", "True or false"],
                ["list", "[1, 2, 3]", "Ordered, modifiable list"],
                ["tuple", "(1, 2, 3)", "Immutable list"],
                ["dict", "{'clave': 1}", "Key-value pairs"],
                ["set", "{1, 2, 3}", "Collection without duplicates"],
                ["NoneType", "None", "Nothing, absence of value"],
              ],
            },
          },
          {
            type: "code",
            title: "Pregúntale a Python",
            code: `print(type(42))        # <class 'int'>
print(type("hola"))    # <class 'str'>
print(type([1, 2]))    # <class 'list'>
print(type(True))      # <class 'bool'>`,
            en: {
              title: "Ask Python",
              code: `print(type(42))        # <class 'int'>
print(type("hi"))      # <class 'str'>
print(type([1, 2]))    # <class 'list'>
print(type(True))      # <class 'bool'>`,
            },
          },
          {
            type: "note",
            tone: "tip",
            text:
              "`type()` es tu mejor amigo cuando no sabes qué tienes delante.",
            en: {
              text:
                "`type()` is your best friend when you don't know what you're looking at.",
            },
          },
        ],
      },
      {
        id: "numeros",
        title: "Números y operadores",
        desc: "Aritmética, división entera, módulo y potencias.",
        en: { title: "Numbers and operators", desc: "Arithmetic, integer division, modulo and powers." },
        blocks: [
          {
            type: "p",
            text:
              "Python trae los operadores aritméticos clásicos y un par de extra que dan mucho juego:",
            en: {
              text:
                "Python ships with the classic arithmetic operators plus a couple of extra ones that are very handy:",
            },
          },
          {
            type: "table",
            caption: "Operadores aritméticos",
            headers: ["Operador", "Operación", "Ejemplo", "Resultado"],
            rows: [
              ["+", "Suma", "5 + 2", "7"],
              ["-", "Resta", "5 - 2", "3"],
              ["*", "Multiplicación", "5 * 2", "10"],
              ["/", "División (siempre decimal)", "5 / 2", "2.5"],
              ["//", "División entera", "5 // 2", "2"],
              ["%", "Módulo (resto)", "5 % 2", "1"],
              ["**", "Potencia", "5 ** 2", "25"],
            ],
            en: {
              caption: "Arithmetic operators",
              headers: ["Operator", "Operation", "Example", "Result"],
              rows: [
                ["+", "Addition", "5 + 2", "7"],
                ["-", "Subtraction", "5 - 2", "3"],
                ["*", "Multiplication", "5 * 2", "10"],
                ["/", "Division (always decimal)", "5 / 2", "2.5"],
                ["//", "Floor division", "5 // 2", "2"],
                ["%", "Modulo (remainder)", "5 % 2", "1"],
                ["**", "Power", "5 ** 2", "25"],
              ],
            },
          },
          {
            type: "code",
            title: "En acción",
            code: `print(7 / 2)    # 3.5   la división siempre devuelve float
print(7 // 2)   # 3
print(7 % 2)    # 1     el resto, ideal para pares e impares
print(2 ** 10)  # 1024`,
            en: {
              title: "In action",
              code: `print(7 / 2)    # 3.5   division always returns a float
print(7 // 2)   # 3
print(7 % 2)    # 1     the remainder, great for odds and evens
print(2 ** 10)  # 1024`,
            },
          },
          {
            type: "note",
            tone: "tip",
            text: "Para redondear: `round(numero, decimales)`.",
            en: { text: "To round: `round(number, decimals)`." },
          },
          {
            type: "note",
            tone: "warning",
            text:
              "Sumar un `int` con un `str` da `TypeError`. Convierte primero (ver *Conversión de tipos*).",
            en: {
              text:
                "Adding an `int` to a `str` raises `TypeError`. Convert first (see *Type conversion*).",
            },
          },
        ],
      },
      {
        id: "casting",
        title: "Conversión de tipos",
        desc: "Pasar de un tipo a otro con int(), float(), str()...",
        en: {
          title: "Type conversion",
          desc: "Move from one type to another with int(), float(), str()...",
        },
        blocks: [
          {
            type: "p",
            text:
              "Puedes convertir de un tipo a otro de forma explícita con las funciones `int()`, `float()`, `str()`, `bool()`, `list()`, `tuple()`, `set()` y `dict()`.",
            en: {
              text:
                "You can explicitly convert from one type to another with `int()`, `float()`, `str()`, `bool()`, `list()`, `tuple()`, `set()` and `dict()`.",
            },
          },
          {
            type: "code",
            title: "Conversiones",
            code: `num = "42"                  # viene un str desde input()
total = int(num) + 8          # 50
print(float("3.14"))          # 3.14
print(str(42))                # "42"
print(bool(0))                # False

# 0, None, "" y [] se consideran "falsy"
print(bool(0), bool(None), bool(""), bool([]))   # False False False False`,
            en: {
              title: "Conversions",
              code: `num = "42"                  # comes as a str from input()
total = int(num) + 8          # 50
print(float("3.14"))          # 3.14
print(str(42))                # "42"
print(bool(0))                # False

# 0, None, "" and [] are considered "falsy"
print(bool(0), bool(None), bool(""), bool([]))   # False False False False`,
            },
          },
          {
            type: "note",
            tone: "warning",
            title: "Valor válido, formato inválido",
            text:
              "`int(\"3.14\")` lanza `ValueError`. Primero pasa a `float` y luego a `int`: `int(float(\"3.14\"))` da `3`.",
            en: {
              title: "Valid value, invalid format",
              text:
                "`int(\"3.14\")` raises `ValueError`. Convert to `float` first, then `int`: `int(float(\"3.14\"))` gives `3`.",
            },
          },
          {
            type: "note",
            tone: "key",
            title: "La regla de oro",
            text:
              "`input()` siempre devuelve texto. Si quieres un número, conviértelo en el mismo momento.",
            en: {
              title: "The golden rule",
              text:
                "`input()` always returns text. If you want a number, convert it right away.",
            },
          },
        ],
        quiz: [
          {
            q: "¿Qué devuelve `int(\"42\")`?",
            options: [
              "El texto \"42\"",
              "El número entero 42",
              "42.0",
              "Un error",
            ],
            answer: 1,
            explain: "`int()` convierte un texto a número entero.",
            en: {
              q: "What does `int(\"42\")` return?",
              options: [
                "The text \"42\"",
                "The integer 42",
                "42.0",
                "An error",
              ],
              explain: "`int()` converts text into a whole number.",
            },
          },
          {
            q: "¿Cómo pasamos la cadena \"3.5\" a número decimal?",
            options: ["float(\"3.5\")", "int(\"3.5\")", "str(3.5)", "parse(\"3.5\")"],
            answer: 0,
            explain:
              "`float()` es la conversión a decimal; `int(\"3.5\")` fallaría porque no es un entero.",
            en: {
              q: "How do you turn the string \"3.5\" into a decimal number?",
              options: ["float(\"3.5\")", "int(\"3.5\")", "str(3.5)", "parse(\"3.5\")"],
              explain:
                "`float()` is the conversion to a decimal; `int(\"3.5\")` would fail because it's not a whole number.",
            },
          },
          {
            q: "¿Qué ocurre con `int(\"hola\")`?",
            options: [
              "Devuelve 0",
              "Lanza un ValueError",
              "Convierte a \"hola\"",
              "Devuelve None",
            ],
            answer: 1,
            explain:
              "No se puede convertir texto no numérico: Python lanza `ValueError`.",
            en: {
              q: "What happens with `int(\"hola\")`?",
              options: [
                "It returns 0",
                "It raises a ValueError",
                "It converts to \"hola\"",
                "It returns None",
              ],
              explain:
                "Non-numeric text cannot be converted: Python raises `ValueError`.",
            },
          },
        ],
      },
      {
        id: "entrada",
        title: "Entrada y salida",
        desc: "print() para mostrar, input() para preguntar.",
        en: {
          title: "Input and output",
          desc: "print() to show, input() to ask.",
        },
        blocks: [
          {
            type: "p",
            text:
              "`print()` escribe en pantalla y `input()` pide datos al usuario. La función que hace todo.",
            en: {
              text:
                "`print()` writes to the screen and `input()` asks the user for data. The function that does it all.",
            },
          },
          {
            type: "code",
            title: "Hola, ¿quién eres?",
            code: `nombre = input("¿Cómo te llamas? ")
print(f"Hola, {nombre}")

edad = int(input("¿Cuántos años tienes? "))   # convertimos a int
print(f"El año que viene tendrás {edad + 1}")`,
            en: {
              title: "Hi, who are you?",
              code: `name = input("What's your name? ")
print(f"Hello, {name}")

age = int(input("How old are you? "))   # we convert to int
print(f"Next year you'll be {age + 1}")`,
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "print() admite varios valores",
            text:
              "`print(a, b, c)` separa con espacios y al final añade un salto de línea por defecto. Puedes cambiarlo: `print(a, sep=\" · \", end=\"\\n\")`.",
            en: {
              title: "print() takes several values",
              text:
                "`print(a, b, c)` separates with spaces and adds a newline at the end by default. You can change it: `print(a, sep=\" · \", end=\"\\n\")`.",
            },
          },
          {
            type: "note",
            tone: "warning",
            text:
              "Olvidar `int()` en `edad` reventará al hacer `edad + 1`: será `str + int`.",
            en: {
              text:
                "Forgetting `int()` on `age` will blow up on `age + 1`: it will be `str + int`.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "strings",
    title: "Strings",
    short: "Trabajando con texto",
    blurb:
      "Crear cadenas, darles forma con f-strings, trocearlas y llamar a sus superpoderes.",
    icon: "type",
    en: {
      short: "Working with text",
      blurb:
        "Create strings, shape them with f-strings, slice them up and call on their superpowers.",
    },
    topics: [
      {
        id: "crear",
        title: "Crear y escapar",
        desc: "Comillas simples, dobles, triples y caracteres especiales.",
        en: {
          title: "Creating and escaping",
          desc: "Single, double, and triple quotes plus special characters.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Una cadena se crea con comillas simples, dobles o triples. Las triples permiten saltos de línea y son habituales para textos largos y *docstrings*.",
            en: {
              text:
                "A string is created with single, double, or triple quotes. Triple quotes allow line breaks and are common for long texts and *docstrings*.",
            },
          },
          {
            type: "code",
            title: "Formas de crear",
            code: `saludo = 'Hola'
frase = "Hola mundo"
multilinea = """Primera línea
segunda línea
tercera"""

print(len(saludo))    # 4   len() funciona con cualquier secuencia
print(multilinea.splitlines()[1])   # segunda línea`,
            en: {
              title: "Ways to create",
              code: `greeting = 'Hi'
frase = "Hello world"
multiline = """First line
second line
third"""

print(len(greeting))    # 4   len() works on any sequence
print(multiline.splitlines()[1])   # second line`,
            },
          },
          {
            type: "code",
            title: "Escapar y comillas dentro",
            code: `texto = "Dijo: \\"hola\\""
ruta = 'C:\\\\Users\\\\ana'

# También puedes mezclar comillas sin escapar
mejor = 'Dijo: "hola"'
print(mejor)   # Dijo: "hola"

# Caracteres especiales
print("línea 1\\nlínea 2")     # \\n salto de línea
print("columna\\tcon\\ttab")    # \\t tabulador`,
            en: {
              title: "Escaping and quotes inside",
              code: `text = "She said: \\"hi\\""
ruta = 'C:\\\\Users\\\\ana'

# You can also mix quotes without escaping
better = 'She said: "hi"'
print(better)   # She said: "hi"

# Special characters
print("line 1\\nline 2")      # \\n newline
print("column\\twith\\ttab")   # \\t tab`,
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Escape o comilla opuesta",
            text:
              "La forma más limpia: si el texto lleva comillas dobles, crea la cadena con simples (o al revés). Así evitas escapes.",
            en: {
              title: "Escape or use the opposite quote",
              text:
                "The cleanest approach: if the text has double quotes, create the string with single quotes (or the other way round). That way you avoid escaping.",
            },
          },
        ],
      },
      {
        id: "metodos",
        title: "Métodos de string",
        desc: "lower, upper, strip, split, join, replace y amigos.",
        en: {
          title: "String methods",
          desc: "lower, upper, strip, split, join, replace and friends.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Los strings tienen decenas de métodos. Estos son los que usarás sin parar:",
            en: {
              text:
                "Strings have dozens of methods. These are the ones you'll use non-stop:",
            },
          },
          {
            type: "h",
            text: "Los imprescindibles",
            en: { text: "The essentials" },
          },
          {
            type: "code",
            title: "Los imprescindibles",
            code: `texto = "  Hola, Mundo  "

print(texto.lower())          #   hola, mundo
print(texto.upper())          #   HOLA, MUNDO
print(texto.strip())          # Hola, Mundo   (quita espacios laterales)
print(texto.replace("o", "0"))  #   H0la, Mund0
print(texto.split(", "))      # ['  Hola', 'Mundo  ']

print("hola".startswith("ho"))    # True
print("hola".endswith("la"))      # True
print("hola".count("l"))          # 1
print("hola".find("l"))           # 2   índice de la primera 'l'

print(", ".join(["a", "b", "c"]))  # a, b, c`,
            en: {
              title: "The essentials",
              code: `texto = "  Hello, World  "

print(texto.lower())          #   hello, world
print(texto.upper())          #   HELLO, WORLD
print(texto.strip())          # Hello, World   (removes surrounding spaces)
print(texto.replace("o", "0"))  #   Hell0, W0rld
print(texto.split(", "))      # ['  Hello', 'World  ']

print("hello".startswith("he"))   # True
print("hello".endswith("lo"))     # True
print("hello".count("l"))         # 2
print("hello".find("l"))          # 2   index of the first 'l'

print(", ".join(["a", "b", "c"]))  # a, b, c`,
            },
          },
          {
            type: "note",
            tone: "key",
            text:
              "Los métodos de string devuelven una **cadena nueva**; el original se queda igual. Si quieres el resultado, guárdalo: `texto = texto.lower()`.",
            en: {
              text:
                "String methods return a **new string**; the original stays the same. If you want the result, store it: `texto = texto.lower()`.",
            },
          },
          {
            type: "note",
            tone: "info",
            title: "split() y join()",
            text:
              "Son las dos caras de la misma moneda: `split()` divide una cadena en partes y `join()` une partes en una cadena.",
            en: {
              title: "split() and join()",
              text:
                "They are two sides of the same coin: `split()` breaks a string into pieces and `join()` merges pieces into a string.",
            },
          },
        ],
      },
      {
        id: "fstrings",
        title: "F-strings",
        desc: "Interpolar variables y expresiones con {}.",
        en: {
          title: "F-strings",
          desc: "Interpolate variables and expressions with {}.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Las f-strings (desde Python 3.6) son la forma más limpia de meter valores dentro de texto. Llevan una `f` delante y las llaves `{}` dentro.",
            en: {
              text:
                "F-strings (since Python 3.6) are the cleanest way to drop values into text. They start with `f` and use braces `{}` inside.",
            },
          },
          {
            type: "h",
            text: "Lo básico",
            en: { text: "The basics" },
          },
          {
            type: "code",
            title: "Lo básico",
            code: `nombre, edad = "Ana", 25

print(f"Me llamo {nombre} y tengo {edad} años")
print(f"Dentro de 10 años tendré {edad + 10}")   # vale cualquier expresión
print(f"El doble de 21 es {21 * 2}")`,
            en: {
              title: "The basics",
              code: `name, age = "Ana", 25

print(f"My name is {name} and I am {age} years old")
print(f"In 10 years I'll be {age + 10}")   # any expression works
print(f"Double 21 is {21 * 2}")`,
            },
          },
          {
            type: "h",
            text: "Formato con :",
            en: { text: "Formatting with :" },
          },
          {
            type: "code",
            title: "Formato con :",
            code: `print(f"{22 / 7:.2f}")          # 3.14     dos decimales
print(f"{1234567:,}")            # 1,234,567 separador de miles
print(f"{42:05d}")               # 00042    rellenar con ceros
print(f"{'hola':>10}")           #      hola  alinear a la derecha
print(f"{'x' * 5}")              # xxxxx     expresiones, siempre`,
            en: {
              title: "Formatting with :",
              code: `print(f"{22 / 7:.2f}")          # 3.14     two decimals
print(f"{1234567:,}")            # 1,234,567 thousands separator
print(f"{42:05d}")               # 00042    pad with zeros
print(f"{'hi':>10}")             #        hi  align right
print(f"{'x' * 5}")              # xxxxx     expressions, always`,
            },
          },
          {
            type: "note",
            tone: "warning",
            text:
              "La `f` va **delante** de las comillas: `f\"...\"`. Un string normal con `{}` dentro simplemente imprime las llaves tal cual.",
            en: {
              text:
                "The `f` goes **before** the quotes: `f\"...\"`. A normal string with `{}` inside simply prints the braces as-is.",
            },
          },
          {
            type: "note",
            tone: "key",
            text:
              "Memoriza `f\"{valor:.2f}\"` para dos decimales: aparece en la mitad de los ejercicios de floats.",
            en: {
              text:
                "Memorize `f\"{value:.2f}\"` for two decimals: it shows up in half of all float exercises.",
            },
          },
        ],
        quiz: [
          {
            q: "Con `edad = 25`, ¿qué imprime `f\"Mi edad es {edad}\"`?",
            options: [
              "Mi edad es edad",
              "Mi edad es 25",
              "Mi edad es {25}",
              "Error de sintaxis",
            ],
            answer: 1,
            explain:
              "Las llaves se sustituyen por el valor de la variable: `25`.",
            en: {
              q: "With `age = 25`, what does `f\"My age is {age}\"` print?",
              options: [
                "My age is age",
                "My age is 25",
                "My age is {25}",
                "Syntax error",
              ],
              explain:
                "The braces get replaced by the variable's value: `25`.",
            },
          },
          {
            q: "¿Cómo muestras un decimal con dos posiciones?",
            options: [
              "f\"{n:.2f}\"",
              "f\"{n.2f}\"",
              "f\"{n:.2}\"",
              "f\"{n:2f}\"",
            ],
            answer: 0,
            explain: "El formato `.2f` fija dos decimales, p. ej. `3.14`.",
            en: {
              q: "How do you show a decimal with two digits?",
              options: [
                "f\"{n:.2f}\"",
                "f\"{n.2f}\"",
                "f\"{n:.2}\"",
                "f\"{n:2f}\"",
              ],
              explain: "The `.2f` format sets two decimals, e.g. `3.14`.",
            },
          },
          {
            q: "¿Se puede meter una operación dentro de las llaves?",
            options: [
              "Sí, se evalúa antes de sustituir",
              "No, solo variables",
              "Solo números enteros",
              "Solo cadenas",
            ],
            answer: 0,
            explain: "`f\"{a + b}\"` calcula `a + b` y lo muestra.",
            en: {
              q: "Can you put an operation inside the braces?",
              options: [
                "Yes, it's evaluated before being substituted",
                "No, only variables",
                "Only whole numbers",
                "Only strings",
              ],
              explain: "`f\"{a + b}\"` computes `a + b` and displays it.",
            },
          },
        ],
      },
      {
        id: "slicing",
        title: "Slicing y acceso",
        desc: "Indexar desde 0 y trocear con [inicio:fin:paso].",
        en: {
          title: "Slicing and access",
          desc: "Index from 0 and slice with [start:stop:step].",
        },
        blocks: [
          {
            type: "p",
            text:
              "Los strings son secuencias indexadas desde 0 y se pueden trocear con `[inicio:fin:paso]`.",
            en: {
              text:
                "Strings are sequences indexed from 0 and can be sliced with `[start:stop:step]`.",
            },
          },
          {
            type: "code",
            title: "Índices",
            code: `s = "Python"

print(s[0])      # P      primer carácter
print(s[-1])     # n      el último (índices negativos)
print(s[3])      # h`,
            en: {
              title: "Indexes",
              code: `s = "Python"

print(s[0])      # P      first character
print(s[-1])     # n      the last one (negative indexes)
print(s[3])      # h`,
            },
          },
          {
            type: "code",
            title: "Slice [inicio:fin]",
            code: `print(s[1:4])    # yth    desde 1, hasta 3 (el 4 no entra)
print(s[:3])     # Pyt    desde el inicio
print(s[3:])     # hon    hasta el final
print(s[::2])    # Pto    saltando de 2 en 2
print(s[::-1])   # nohtyP la forma corta de invertir`,
            en: {
              title: "Slice [start:stop]",
              code: `print(s[1:4])    # yth    from 1, up to 3 (4 not included)
print(s[:3])     # Pyt    from the start
print(s[3:])     # hon    to the end
print(s[::2])    # Pto    stepping by 2
print(s[::-1])   # nohtyP the short way to reverse`,
            },
          },
          {
            type: "note",
            tone: "key",
            text:
              "El fin nunca se incluye: `s[a:b]` toma los índices de `a` hasta `b-1`. Es un comportamiento consistente en todo Python.",
            en: {
              text:
                "The stop value is never included: `s[a:b]` takes the indexes from `a` up to `b-1`. It's consistent behavior across all of Python.",
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Invertir con [::-1]",
            text:
              "`[::-1]` invierte cualquier secuencia (strings, listas, tuplas). Perfecto para palíndromos y pijadas elegantes.",
            en: {
              title: "Reversing with [::-1]",
              text:
                "`[::-1]` reverses any sequence (strings, lists, tuples). Perfect for palindromes and neat tricks.",
            },
          },
        ],
      },
      {
        id: "regex",
        title: "Expresiones regulares",
        desc: "Patrones para buscar y extraer texto con precisión.",
        en: {
          title: "Regular expressions",
          desc: "Patterns to search and extract text with precision.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Las expresiones regulares buscan *patrones* dentro del texto, no cadenas exactas. `re.search` encuentra la primera coincidencia; `re.findall` devuelve todas.",
            en: {
              text:
                "Regular expressions look for *patterns* inside text, not exact strings. `re.search` finds the first match; `re.findall` returns them all.",
            },
          },
          {
            type: "h",
            text: "Buscar coincidencias",
            en: { text: "Finding matches" },
          },
          {
            type: "code",
            title: "Buscar coincidencias",
            code: `import re

texto = "mi correo es ana@python.dev y el tuyo?"

match = re.search(r"[a-z]+@[a-z]+[.][a-z]+", texto)
print(bool(match))       # True
print(match.group())     # ana@python.dev

print(re.findall(r"\\d+", "100 g de harina y 2 huevos"))
# ['100', '2']`,
            en: {
              title: "Finding matches",
              code: `import re

text = "my email is ana@python.dev and yours?"

match = re.search(r"[a-z]+@[a-z]+[.][a-z]+", text)
print(bool(match))       # True
print(match.group())     # ana@python.dev

print(re.findall(r"\\d+", "100 g of flour and 2 eggs"))
# ['100', '2']`,
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Usa raw strings",
            text:
              "`r\"\\d\"` indica a Python que no procese las barras. Sin la `r`, `\\d` se rompe y ni te enteras: si algo con regex no cuadra, revisa eso primero.",
            en: {
              title: "Use raw strings",
              text:
                "`r\"\\d\"` tells Python not to process the backslashes. Without the `r`, `\\d` breaks silently: if something with regex doesn't add up, check that first.",
            },
          },
          {
            type: "note",
            tone: "key",
            title: "Los clasificadores",
            text:
              "`\\d` dígito, `\\w` letra o número, `\\s` espacio, `.` cualquier caracter. Con `+` uno o más, `*` cero o más, `?` cero o uno, y `[a-z]` un rango concreto.",
            en: {
              title: "The shorthands",
              text:
                "`\\d` a digit, `\\w` a letter or number, `\\s` whitespace, `.` any character. With `+` one or more, `*` zero or more, `?` zero or one, and `[a-z]` a specific range.",
            },
          },
          {
            type: "note",
            tone: "warning",
            text:
              "Regex lentas pueden congelar tu programa. Para analizar HTML, JSON o código estructurado usa una biblioteca especializada, no regex.",
            en: {
              text:
                "Slow regexes can freeze your program. For analyzing HTML, JSON or structured code, use a dedicated library, not regex.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "colecciones",
    title: "Colecciones",
    short: "Listas, dicts, sets...",
    blurb:
      "Listas y tuplas para secuencias, diccionarios para claves y valores, sets para conjuntos y comprehensions para construir todo eso.",
    icon: "layers",
    en: {
      title: "Collections",
      short: "Lists, dicts, sets...",
      blurb:
        "Lists and tuples for sequences, dictionaries for keys and values, sets for unique items and comprehensions to build all of that.",
    },
    topics: [
      {
        id: "listas",
        title: "Listas",
        desc: "La estructura más usada: ordenada, modificable, permisiva.",
        en: {
          title: "Lists",
          desc: "The most used structure: ordered, modifiable, permissive.",
        },
        blocks: [
          {
            type: "p",
            text:
              "La estructura de datos por excelencia. Ordenada, modificable y sin pereza para mezclar tipos.",
            en: {
              text:
                "The data structure par excellence. Ordered, modifiable and happy to mix types.",
            },
          },
          {
            type: "code",
            title: "Operaciones básicas",
            code: `frutas = ["manzana", "plátano", "kiwi"]

frutas.append("naranja")       # añade al final
frutas.insert(1, "pera")       # inserta en una posición
frutas.remove("kiwi")          # quita por valor
ultima = frutas.pop()          # quita y devuelve la última

print(len(frutas))             # 4
print("pera" in frutas)        # True
print(frutas[0])               # manzana
print(sorted(frutas))          # copia ordenada, no afecta a frutas`,
            en: {
              title: "Basic operations",
              code: `fruits = ["apple", "banana", "kiwi"]

fruits.append("orange")        # adds at the end
fruits.insert(1, "pear")       # inserts at a position
fruits.remove("kiwi")          # removes by value
last = fruits.pop()            # removes and returns the last item

print(len(fruits))             # 4
print("pear" in fruits)        # True
print(fruits[0])               # apple
print(sorted(fruits))          # sorted copy, does not affect fruits`,
            },
          },
          {
            type: "note",
            tone: "warning",
            title: "sort() vs sorted()",
            text:
              "`sorted(lista)` devuelve una copia ordenada. `lista.sort()` ordena **sobre la propia lista** y devuelve `None`. Confundirlos es el error clásico de las listas.",
            en: {
              title: "sort() vs sorted()",
              text:
                "`sorted(list)` returns a sorted copy. `list.sort()` sorts **in place** and returns `None`. Mixing them up is the classic list mistake.",
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Detalle de idioma",
            text:
              "Es `lista.append(x)`, no `push()`: eso es JavaScript. `append()` solo añade un elemento; para varios usa `lista.extend([...])`.",
            en: {
              title: "A language detail",
              text:
                "It's `list.append(x)`, not `push()`: that's JavaScript. `append()` adds a single item; for several use `list.extend([...])`.",
            },
          },
        ],
        quiz: [
          {
            q: "¿Qué devuelve `len([1, 2, 3])`?",
            options: ["1", "2", "3", "Un error"],
            answer: 2,
            explain: "`len()` cuenta los elementos de la lista.",
            en: {
              q: "What does `len([1, 2, 3])` return?",
              options: ["1", "2", "3", "An error"],
              explain: "`len()` counts the items in the list.",
            },
          },
          {
            q: "¿Qué hace `mi_lista.append(4)`?",
            options: [
              "Borra el último elemento",
              "Añade 4 al final",
              "Crea una copia",
              "Cambia el primer elemento",
            ],
            answer: 1,
            explain: "`append()` añade un elemento al final, modificando la lista.",
            en: {
              q: "What does `mi_lista.append(4)` do?",
              options: [
                "Deletes the last item",
                "Adds 4 to the end",
                "Creates a copy",
                "Changes the first item",
              ],
              explain: "`append()` adds an item to the end, modifying the list.",
            },
          },
          {
            q: "¿Qué extrae `[1, 2, 3, 4][-1]`?",
            options: ["1", "4", "Un error", "[1, 2, 3]"],
            answer: 1,
            explain: "`-1` es el último elemento: `4`.",
            en: {
              q: "What does `[1, 2, 3, 4][-1]` extract?",
              options: ["1", "4", "An error", "[1, 2, 3]"],
              explain: "`-1` is the last item: `4`.",
            },
          },
        ],
      },
      {
        id: "tuplas",
        title: "Tuplas",
        desc: "Secuencias inmutables que no se cambian jamás.",
        en: {
          title: "Tuples",
          desc: "Immutable sequences that never change.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Como las listas pero **inmutables**: una vez creadas, no cambian. Ideales para proteger el orden y los valores de un conjunto fijo.",
            en: {
              text:
                "Like lists but **immutable**: once created, they never change. Ideal for protecting the order and values of a fixed set.",
            },
          },
          {
            type: "code",
            title: "Crear y desempaquetar",
            code: `punto = (3, 4)

x, y = punto            # desempaquetar
print(x, y)             # 3 4

a, b = (1, 2)
a, b = b, a             # swap en una línea, imparable
print(a, b)             # 2 1

tupla_de_un_elemento = (5,)   # la coma es obligatoria

# punto[0] = 99  ->  TypeError: 'tuple' object does not support item assignment`,
            en: {
              title: "Creating and unpacking",
              code: `point = (3, 4)

x, y = point            # unpacking
print(x, y)             # 3 4

a, b = (1, 2)
a, b = b, a             # one-line swap, unstoppable
print(a, b)             # 2 1

one_item_tuple = (5,)   # the comma is mandatory

# point[0] = 99  ->  TypeError: 'tuple' object does not support item assignment`,
            },
          },
          {
            type: "note",
            tone: "key",
            title: "Desempaquetar no es exclusivo de tuplas",
            text:
              "Funciona con listas: `a, b = [1, 2]`. Y el guion bajo descarta valores: `_, b = (1, 2)`.",
            en: {
              title: "Unpacking isn't just for tuples",
              text:
                "It works with lists too: `a, b = [1, 2]`. And the underscore discards values: `_, b = (1, 2)`.",
            },
          },
          {
            type: "note",
            tone: "info",
            title: "Usos típicos",
            text:
              "Funciones que devuelven varios valores (una tupla), coordenadas, fechas, configuraciones que no deben mutar.",
            en: {
              title: "Typical uses",
              text:
                "Functions that return several values (a tuple), coordinates, dates, settings that must not change.",
            },
          },
        ],
      },
      {
        id: "dicts",
        title: "Diccionarios",
        desc: "Pares clave -> valor con búsqueda rapidísima.",
        en: {
          title: "Dictionaries",
          desc: "Key-value pairs with blazing-fast lookup.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Guardan pares de clave -> valor. La clave debe ser inmutable (str, int, tuple); el valor, lo que quieras.",
            en: {
              text:
                "They store key-value pairs. The key must be immutable (str, int, tuple); the value can be anything.",
            },
          },
          {
            type: "h",
            text: "Operaciones básicas",
            en: { text: "Basic operations" },
          },
          {
            type: "code",
            title: "Operaciones básicas",
            code: `usuario = {"nombre": "Ana", "edad": 25}

usuario["email"] = "ana@mail.com"         # añadir o modificar
print(usuario.get("telefono", "n/a"))     # n/a   no lanza error
print("edad" in usuario)                  # True  buscar clave

del usuario["edad"]                       # borrar
print(list(usuario.keys()))               # ['nombre', 'email']
print(list(usuario.values()))             # [...]
print(usuario.items())                    # pares (clave, valor)`,
            en: {
              title: "Basic operations",
              code: `user = {"name": "Ana", "age": 25}

user["email"] = "ana@mail.com"      # add or update
print(user.get("phone", "n/a"))     # n/a   does not raise an error
print("age" in user)                # True  look up a key

del user["age"]                     # delete
print(list(user.keys()))            # ['name', 'email']
print(list(user.values()))          # [...]
print(user.items())                 # (key, value) pairs`,
            },
          },
          {
            type: "h",
            text: "Recorrer clave y valor",
            en: { text: "Iterating keys and values" },
          },
          {
            type: "code",
            title: "Recorrer clave y valor a la vez",
            code: `usuario = {"nombre": "Ana", "edad": 25, "ciudad": "Madrid"}

for clave, valor in usuario.items():
    print(f"{clave}: {valor}")

# nombre: Ana
# edad: 25
# ciudad: Madrid`,
            en: {
              title: "Iterating keys and values together",
              code: `user = {"name": "Ana", "age": 25, "city": "Madrid"}

for key, value in user.items():
    print(f"{key}: {value}")

# name: Ana
# age: 25
# city: Madrid`,
            },
          },
          {
            type: "note",
            tone: "tip",
            text:
              "`dict.get(clave, valor_por_defecto)` evita el `KeyError`. Úsalo cuando la clave pueda no existir.",
            en: {
              text:
                "`dict.get(key, default_value)` avoids the `KeyError`. Use it when the key might not exist.",
            },
          },
          {
            type: "note",
            tone: "warning",
            text:
              "`usuario[\"telefono\"]` lanza `KeyError` si la clave falta. `usuario.get(\"telefono\")` devuelve `None`.",
            en: {
              text:
                "`user[\"phone\"]` raises `KeyError` if the key is missing. `user.get(\"phone\")` returns `None`.",
            },
          },
        ],
        quiz: [
          {
            q: "¿Cómo accedes al valor de la clave \"nombre\" del dict `d`?",
            options: ["d.nombre", "d[\"nombre\"]", "d[nombre]", "d->nombre"],
            answer: 1,
            explain:
              "`d[\"nombre\"]` accede por clave; el punto no funciona en dicts (eso es para atributos).",
            en: {
              q: "How do you access the value for the key \"name\" in dict `d`?",
              options: ["d.name", "d[\"name\"]", "d[name]", "d->name"],
              explain:
                "`d[\"name\"]` accesses by key; the dot does not work on dicts (that's for attributes).",
            },
          },
          {
            q: "¿Qué devuelve `d.keys()`?",
            options: [
              "Los valores",
              "Las claves",
              "Borra las claves",
              "Añade una clave",
            ],
            answer: 1,
            explain: "`keys()` da las claves; `values()` da los valores.",
            en: {
              q: "What does `d.keys()` return?",
              options: [
                "The values",
                "The keys",
                "It deletes the keys",
                "It adds a key",
              ],
              explain: "`keys()` gives the keys; `values()` gives the values.",
            },
          },
          {
            q: "Si la clave no existe, `d[\"x\"]`…",
            options: [
              "Devuelve None",
              "Lanza un KeyError",
              "La crea con None",
              "Devuelve 0",
            ],
            answer: 1,
            explain: "Salvo que uses `d.get(\"x\", default)`, que no lanza error.",
            en: {
              q: "If the key doesn't exist, `d[\"x\"]`…",
              options: [
                "Returns None",
                "Raises a KeyError",
                "Creates it with None",
                "Returns 0",
              ],
              explain: "Unless you use `d.get(\"x\", default)`, which doesn't raise an error.",
            },
          },
        ],
      },
      {
        id: "sets",
        title: "Conjuntos (sets)",
        desc: "Sin duplicados, sin orden, búsqueda instantánea.",
        en: {
          title: "Sets",
          desc: "No duplicates, no order, instant lookup.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Una colección **sin duplicados** y **sin orden**. Perfecta para \"¿está esto en el grupo?\" y para operaciones de conjuntos.",
            en: {
              text:
                "A collection **without duplicates** and **without order**. Perfect for \"is this in the group?\" and set operations.",
            },
          },
          {
            type: "code",
            title: "Sin duplicados",
            code: `colores = {"rojo", "verde", "rojo"}
print(colores)             # {'verde', 'rojo'}  el rojo cuenta una vez

letras = set("hola")
print(letras)              # {'h', 'o', 'l', 'a'}  sin repetidos

# El truco estrella: quitar duplicados de una lista
numeros = [1, 2, 2, 3, 3, 3]
print(list(set(numeros)))  # [1, 2, 3]`,
            en: {
              title: "No duplicates",
              code: `colors = {"red", "green", "red"}
print(colors)             # {'green', 'red'}  red counts once

letters = set("hola")
print(letters)            # {'h', 'o', 'l', 'a'}  no repeats

# The star trick: removing duplicates from a list
numeros = [1, 2, 2, 3, 3, 3]
print(list(set(numeros)))  # [1, 2, 3]`,
            },
          },
          {
            type: "code",
            title: "Operaciones de conjuntos",
            code: `a = {1, 2, 3}
b = {3, 4, 5}

print(a & b)     # {3}           intersección
print(a | b)     # {1, 2, 3, 4, 5} unión
print(a - b)     # {1, 2}        diferencia
print(3 in a)    # True          búsqueda rapidísima
print(a <= {1, 2, 3, 9})   # True   subconjunto`,
            en: {
              title: "Set operations",
              code: `a = {1, 2, 3}
b = {3, 4, 5}

print(a & b)     # {3}                intersection
print(a | b)     # {1, 2, 3, 4, 5}    union
print(a - b)     # {1, 2}             difference
print(3 in a)    # True               instant lookup
print(a <= {1, 2, 3, 9})   # True     subset`,
            },
          },
          {
            type: "note",
            tone: "warning",
            text:
              "Un set no mantiene orden ni se indexa: `s[0]` da `TypeError`. Úsalo para duplicados y pertenencia, no para ordenar.",
            en: {
              text:
                "A set keeps no order and can't be indexed: `s[0]` raises `TypeError`. Use it for duplicates and membership, not for ordering.",
            },
          },
        ],
      },
      {
        id: "comprehensions",
        title: "Comprehensions",
        desc: "Construir listas, dicts y sets en una línea legible.",
        en: {
          title: "Comprehensions",
          desc: "Build lists, dicts and sets in one readable line.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Forma concisa de construir listas (y dicts y sets) a partir de otra secuencia. Más legible que un bucle con `append` y más rápida.",
            en: {
              text:
                "A concise way to build lists (and dicts and sets) from another sequence. More readable than a loop with `append`, and faster.",
            },
          },
          {
            type: "h",
            text: "Listas",
            en: { text: "Lists" },
          },
          {
            type: "code",
            title: "Listas",
            code: `numeros = [1, 2, 3, 4, 5]

pares = [n for n in numeros if n % 2 == 0]    # [2, 4]
cuadrados = [n ** 2 for n in numeros]         # [1, 4, 9, 16, 25]
dobles = [n * 10 for n in range(4)]           # [0, 10, 20, 30]`,
            en: {
              title: "Lists",
              code: `numeros = [1, 2, 3, 4, 5]

evens = [n for n in numeros if n % 2 == 0]    # [2, 4]
squares = [n ** 2 for n in numeros]           # [1, 4, 9, 16, 25]
doubles = [n * 10 for n in range(4)]          # [0, 10, 20, 30]`,
            },
          },
          {
            type: "h",
            text: "Dicts y sets",
            en: { text: "Dicts and sets" },
          },
          {
            type: "code",
            title: "Dicts y sets",
            code: `cuadrados_dic = {n: n ** 2 for n in range(3)}
# {0: 0, 1: 1, 2: 4}

pares_set = {n for n in range(10) if n % 2 == 0}
# {0, 2, 4, 6, 8}

letras = {letra for letra in "banana"}
# {'b', 'a', 'n'}`,
            en: {
              title: "Dicts and sets",
              code: `squares_dict = {n: n ** 2 for n in range(3)}
# {0: 0, 1: 1, 2: 4}

even_set = {n for n in range(10) if n % 2 == 0}
# {0, 2, 4, 6, 8}

letters = {letter for letter in "banana"}
# {'b', 'a', 'n'}`,
            },
          },
          {
            type: "note",
            tone: "key",
            title: "La estructura",
            text:
              "`[expresión for elemento in secuencia if condición]`. Se lee igual que una frase: \"para cada elemento en la secuencia, si se cumple la condición, evalúa la expresión\".",
            en: {
              title: "The structure",
              text:
                "`[expression for item in sequence if condition]`. It reads like a sentence: \"for each item in the sequence, if the condition holds, evaluate the expression\".",
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Legibilidad ante todo",
            text:
              "Si la línea deja de leerse fácil, vuelve al bucle clásico. Una comprehension monstruosa nadie la entiende.",
            en: {
              title: "Readability first",
              text:
                "If the line stops being easy to read, go back to a classic loop. Nobody understands a monstrous comprehension.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "control",
    title: "Control de flujo",
    short: "Decisiones y bucles",
    blurb:
      "Condicionales, bucles for y while, break y continue, y comparaciones. El pulso de tus programas.",
    icon: "branch",
    en: {
      title: "Control flow",
      short: "Decisions and loops",
      blurb:
        "Conditionals, for and while loops, break and continue, and comparisons. The heartbeat of your programs.",
    },
    topics: [
      {
        id: "if",
        title: "Condicionales",
        desc: "if / elif / else. La indentación define el bloque.",
        en: {
          title: "Conditionals",
          desc: "if / elif / else. Indentation defines the block.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Toma decisiones. Python es famoso por su legibilidad: la indentación define los bloques, no las llaves.",
            en: {
              text:
                "Make decisions. Python is famous for its readability: indentation defines blocks, not braces.",
            },
          },
          {
            type: "code",
            title: "La estructura",
            code: `edad = int(input("¿Edad? "))

if edad >= 18:
    print("Mayor de edad")
elif edad >= 13:
    print("Adolescente")
else:
    print("Niño")`,
            en: {
              title: "The structure",
              code: `age = int(input("Age? "))

if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")`,
            },
          },
          {
            type: "note",
            tone: "warning",
            title: "La indentación es obligatoria",
            text:
              "El cuerpo del `if` va sangrado. Mezclar espacios y tabulaciones o no sangrar dispara `IndentationError`.",
            en: {
              title: "Indentation is mandatory",
              text:
                "The body of the `if` must be indented. Mixing spaces and tabs, or not indenting at all, raises `IndentationError`.",
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Orden importa",
            text:
              "Python prueba las condiciones de arriba abajo y ejecuta la **primera** que da `True`. Pon las condiciones estrictas primero y usa `elif`, nunca `else if`.",
            en: {
              title: "Order matters",
              text:
                "Python checks the conditions top to bottom and runs the **first** one that is `True`. Put the strict conditions first and use `elif`, never `else if`.",
            },
          },
        ],
        quiz: [
          {
            q: "¿Qué evalúa la condición de un `if`?",
            options: [
              "Una cadena de texto",
              "Una expresión booleana (verdadero/falso)",
              "Un número, siempre",
              "Un import",
            ],
            answer: 1,
            explain:
              "`if` decide según una condición que resulta en `True` o `False`.",
            en: {
              q: "What does the condition of an `if` evaluate?",
              options: [
                "A text string",
                "A boolean expression (true/false)",
                "A number, always",
                "An import",
              ],
              explain:
                "`if` decides based on a condition that results in `True` or `False`.",
            },
          },
          {
            q: "¿Cuándo se comprueba un `elif`?",
            options: [
              "Siempre, además del if",
              "Solo si la condición anterior fue falsa",
              "Solo si una lista está vacía",
              "Reinicia el flujo",
            ],
            answer: 1,
            explain:
              "`elif` solo se evalúa si todas las condiciones anteriores fueron falsas.",
            en: {
              q: "When is an `elif` checked?",
              options: [
                "Always, in addition to the if",
                "Only if the previous condition was false",
                "Only if a list is empty",
                "It restarts the flow",
              ],
              explain:
                "`elif` is only evaluated if all previous conditions were false.",
            },
          },
          {
            q: "¿Es obligatorio el `else`?",
            options: [
              "Sí, siempre",
              "No, es opcional",
              "Solo dentro de bucles",
              "Solo al final de una función",
            ],
            answer: 1,
            explain:
              "`else` es opcional: define el camino para cuando ninguna condición se cumple.",
            en: {
              q: "Is the `else` mandatory?",
              options: [
                "Yes, always",
                "No, it's optional",
                "Only inside loops",
                "Only at the end of a function",
              ],
              explain:
                "`else` is optional: it defines the path for when no condition is met.",
            },
          },
        ],
      },
      {
        id: "for",
        title: "Bucles for",
        desc: "Recorrer secuencias: range, listas, dicts, strings.",
        en: {
          title: "for loops",
          desc: "Iterate over sequences: range, lists, dicts, strings.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Recorre cualquier secuencia: listas, strings, dicts, rangos, ficheros... Es el bucle que usarás el 90% de las veces.",
            en: {
              text:
                "It goes over any sequence: lists, strings, dicts, ranges, files... It's the loop you'll use 90% of the time.",
            },
          },
          {
            type: "h",
            text: "Cuatro formas de recorrer",
            en: { text: "Four ways to iterate" },
          },
          {
            type: "code",
            title: "Cuatro formas de recorrer",
            code: `for letra in "hola":
    print(letra)              # h o l a

for i in range(3):           # 0, 1, 2
    print(i)

for fruta in ["manzana", "pera"]:
    print(f"Me gusta la {fruta}")

for i, fruta in enumerate(["a", "b", "c"]):
    print(i, fruta)          # 0 a / 1 b / 2 c`,
            en: {
              title: "Four ways to iterate",
              code: `for letter in "hola":
    print(letter)            # h o l a

for i in range(3):           # 0, 1, 2
    print(i)

for fruit in ["manzana", "pera"]:
    print(f"I like {fruit}")

for i, fruit in enumerate(["a", "b", "c"]):
    print(i, fruit)          # 0 a / 1 b / 2 c`,
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "range(inicio, fin, paso)",
            text:
              "`range(1, 10, 2)` da 1, 3, 5, 7, 9. Como en el slicing, el valor de `fin` nunca se incluye. Y `enumerate()` te da índice y valor a la vez.",
            en: {
              title: "range(start, stop, step)",
              text:
                "`range(1, 10, 2)` gives 1, 3, 5, 7, 9. As with slicing, the `stop` value is never included. And `enumerate()` gives you index and value at once.",
            },
          },
        ],
        quiz: [
          {
            q: "¿Cuántas veces se ejecuta el cuerpo de `for x in range(3)`?",
            options: ["2", "3", "4", "Infinitas"],
            answer: 1,
            explain: "`range(3)` genera 0, 1 y 2: tres vueltas.",
            en: {
              q: "How many times does the body of `for x in range(3)` run?",
              options: ["2", "3", "4", "Infinite"],
              explain: "`range(3)` yields 0, 1 and 2: three passes.",
            },
          },
          {
            q: "En `for letra in \"hola\"`, ¿qué vale `letra` en cada vuelta?",
            options: [
              "El índice de la posición",
              "Cada carácter: h, o, l, a",
              "Toda la cadena",
              "Los números 0, 1, 2, 3",
            ],
            answer: 1,
            explain:
              "Iterar sobre una cadena recorre sus caracteres, uno en cada vuelta.",
            en: {
              q: "In `for letter in \"hola\"`, what is `letter` each pass?",
              options: [
                "The position index",
                "Each character: h, o, l, a",
                "The whole string",
                "The numbers 0, 1, 2, 3",
              ],
              explain:
                "Iterating over a string goes through its characters, one per pass.",
            },
          },
          {
            q: "¿Cómo recorres una lista pudiendo usar el índice?",
            options: [
              "for i in range(len(lista))",
              "for i in len(lista)",
              "for lista in i",
              "for i, lista in enumerate(len(lista))",
            ],
            answer: 0,
            explain:
              "`range(len(lista))` genera índices válidos; o usa `enumerate(lista)` para índice y valor.",
            en: {
              q: "How do you iterate a list while using the index?",
              options: [
                "for i in range(len(lista))",
                "for i in len(lista)",
                "for lista in i",
                "for i, lista in enumerate(len(lista))",
              ],
              explain:
                "`range(len(lista))` generates valid indexes; or use `enumerate(lista)` for index and value.",
            },
          },
        ],
      },
      {
        id: "while",
        title: "Bucles while",
        desc: "Repetir mientras una condición sea verdadera.",
        en: {
          title: "while loops",
          desc: "Repeat as long as a condition is true.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Repite mientras una condición sea verdadera. Perfecto cuando no sabes de antemano cuántas repeticiones harán falta.",
            en: {
              text:
                "It repeats while a condition is true. Perfect when you don't know in advance how many iterations you'll need.",
            },
          },
          {
            type: "code",
            title: "Dos ejemplos",
            code: `contador = 0
while contador < 3:
    print(contador)
    contador += 1           # imprescindible: avanza

# Pedir hasta acertar
clave = ""
while clave != "pi":
    clave = input("Escribe 'pi' para salir: ")
print("¡Acertaste!")`,
            en: {
              title: "Two examples",
              code: `counter = 0
while counter < 3:
    print(counter)
    counter += 1            # essential: advance

# Keep asking until correct
password = ""
while password != "pi":
    password = input("Type 'pi' to exit: ")
print("You got it!")`,
            },
          },
          {
            type: "note",
            tone: "warning",
            title: "Bucle infinito",
            text:
              "Si la condición nunca se vuelve falsa (p. ej. olvidas el `contador += 1`), el programa no termina. Un `Ctrl + C` rompe el bucle en la terminal.",
            en: {
              title: "Infinite loop",
              text:
                "If the condition never becomes false (e.g. you forget `counter += 1`), the program never ends. `Ctrl + C` breaks the loop in the terminal.",
            },
          },
        ],
        quiz: [
          {
            q: "¿Cuándo se repite un bucle `while`?",
            options: [
              "Mientras la condición sea verdadera",
              "Siempre un número fijo de veces",
              "Hasta llegar a 10",
              "Mientras exista un for dentro",
            ],
            answer: 0,
            explain:
              "El `while` repite mientras su condición devuelva `True`.",
            en: {
              q: "When does a `while` loop repeat?",
              options: [
                "While the condition is true",
                "Always a fixed number of times",
                "Until it reaches 10",
                "While there's a for inside",
              ],
              explain:
                "The `while` repeats as long as its condition returns `True`.",
            },
          },
          {
            q: "¿Cómo evitas un bucle infinito por accidente?",
            options: [
              "Que algo cambie en cada vuelta y acabe haciendo falsa la condición",
              "Usando `while True` siempre",
              "Sin tocar las variables del bucle",
              "Poniendo `break` al principio del cuerpo",
            ],
            answer: 0,
            explain:
              "Si la condición depende de una variable que nunca cambia, el bucle no termina.",
            en: {
              q: "How do you avoid an accidental infinite loop?",
              options: [
                "Make sure something changes each pass and eventually makes the condition false",
                "Always use `while True`",
                "Don't touch the loop variables",
                "Put `break` at the start of the body",
              ],
              explain:
                "If the condition depends on a variable that never changes, the loop never ends.",
            },
          },
        ],
      },
      {
        id: "breakcontinue",
        title: "break, continue y else",
        desc: "Interrumpir, saltar o saber que todo acabó bien.",
        en: {
          title: "break, continue and else",
          desc: "Interrupt, skip ahead, or know that everything finished well.",
        },
        blocks: [
          {
            type: "code",
            title: "break corta, continue salta",
            code: `for n in range(10):
    if n == 5:
        break               # corta el bucle en el 5
    print(n)                # 0 1 2 3 4

for n in range(5):
    if n == 2:
        continue            # se salta el 2
    print(n)                # 0 1 3 4`,
            en: {
              title: "break stops, continue skips",
              code: `for n in range(10):
    if n == 5:
        break               # stops the loop at 5
    print(n)                # 0 1 2 3 4

for n in range(5):
    if n == 2:
        continue            # skips the 2
    print(n)                # 0 1 3 4`,
            },
          },
          {
            type: "code",
            title: "El else del bucle",
            code: `for n in range(3):
    print(n)                # 0 1 2
else:
    print("Terminó normal") # se ejecuta al terminar sin break

for n in range(5):
    if n == 3:
        break
else:
    print("No se imprime: hubo break")`,
            en: {
              title: "The loop's else",
              code: `for n in range(3):
    print(n)                # 0 1 2
else:
    print("Ended normally") # runs when it finishes without break

for n in range(5):
    if n == 3:
        break
else:
    print("Not printed: there was a break")`,
            },
          },
          {
            type: "note",
            tone: "info",
            title: "El else del bucle",
            text:
              "Es raro pero útil: se ejecuta solo si el bucle acabó **sin** `break`. Típico para \"recorrí la lista buscando algo y no lo encontré\".",
            en: {
              title: "The loop's else",
              text:
                "It's rare but useful: it only runs if the loop finished **without** a `break`. Typical for \"I went through the list looking for something and didn't find it\".",
            },
          },
        ],
      },
      {
        id: "comparaciones",
        title: "Comparaciones y booleanos",
        desc: "==, is, and, or, not y comparaciones encadenadas.",
        en: {
          title: "Comparisons and booleans",
          desc: "==, is, and, or, not and chained comparisons.",
        },
        blocks: [
          {
            type: "code",
            title: "Comparar y combinar",
            code: `print(10 > 5)             # True
print(1 < 2 < 3)          # True   Python permite encadenar
print(True and False)     # False
print(True or False)      # True
print(not True)           # False
print("ana" == "Ana")     # False   distingue mayúsculas
print([1, 2] == [1, 2])   # True    compara contenido`,
            en: {
              title: "Compare and combine",
              code: `print(10 > 5)             # True
print(1 < 2 < 3)          # True   Python allows chaining
print(True and False)     # False
print(True or False)      # True
print(not True)           # False
print("ana" == "Ana")     # False   distinguishes case
print([1, 2] == [1, 2])   # True    compares content`,
            },
          },
          {
            type: "code",
            title: "== vs is",
            code: `print([1, 2] == [1, 2])   # True   mismo contenido
print([1, 2] is [1, 2])   # False  distinto objeto

valor = None
print(valor is None)      # True   para None se usa is`,
            en: {
              title: "== vs is",
              code: `print([1, 2] == [1, 2])   # True   same content
print([1, 2] is [1, 2])   # False  different object

value = None
print(value is None)      # True   for None you use is`,
            },
          },
          {
            type: "note",
            tone: "key",
            title: "La regla",
            text:
              "`==` compara **valores**; `is` compara **identidad** (si es el mismo objeto). Para `None` la costumbre es `is None`. Y cuidado: `valor is True` es traicionero con `1`.",
            en: {
              title: "The rule",
              text:
                "`==` compares **values**; `is` compares **identity** (whether it's the same object). For `None` the convention is `is None`. And beware: `value is True` is treacherous with `1`.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "funciones",
    title: "Funciones",
    short: "Reutilizar y organizar",
    blurb:
      "Definir funciones, jugar con parámetros, devolver valores, lambdas y el siempre delicado alcance de variables.",
    icon: "braces",
    en: {
      title: "Functions",
      short: "Reuse and organize",
      blurb:
        "Define functions, play with parameters, return values, lambdas and the always delicate variable scope.",
    },
    topics: [
      {
        id: "definir",
        title: "Definir y llamar",
        desc: "def, el cuerpo indentado y la llamada con ().",
        en: {
          title: "Define and call",
          desc: "def, the indented body and calling with ().",
        },
        blocks: [
          {
            type: "p",
            text:
              "`def` define una función que podrás reutilizar. El cuerpo va indentado, como todo bloque en Python.",
            en: {
              text:
                "`def` defines a function you can reuse. The body is indented, like every block in Python.",
            },
          },
          {
            type: "code",
            title: "Mínimo viable",
            code: `def saludar(nombre):
    return f"Hola, {nombre}"

mensaje = saludar("Ana")
print(mensaje)               # Hola, Ana

def sumar(a, b):
    return a + b

print(sumar(3, 4))           # 7`,
            en: {
              title: "Minimum viable",
              code: `def greet(name):
    return f"Hello, {name}"

message = greet("Ana")
print(message)               # Hello, Ana

def add(a, b):
    return a + b

print(add(3, 4))             # 7`,
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Definir no es ejecutar",
            text:
              "La función no hace nada hasta que la **llamas** con paréntesis: `saludar(\"Ana\")`. `saludar` a secas no ejecuta nada.",
            en: {
              title: "Defining is not executing",
              text:
                "The function does nothing until you **call** it with parentheses: `greet(\"Ana\")`. `greet` by itself doesn't run anything.",
            },
          },
          {
            type: "note",
            tone: "info",
            text:
              "Una función puede no tener parámetros ni devolver nada: `def limpiar():` seguido de un cuerpo. Devuelve `None` implícitamente (mira la ficha de `return`).",
            en: {
              text:
                "A function can take no parameters and return nothing: `def limpiar():` followed by a body. It implicitly returns `None` (see the `return` card).",
            },
          },
        ],
      },
      {
        id: "parametros",
        title: "Parámetros y argumentos",
        desc: "Posicionales, con nombre, valores por defecto, *args y **kwargs.",
        en: {
          title: "Parameters and arguments",
          desc: "Positional, keyword, default values, *args and **kwargs.",
        },
        blocks: [
          {
            type: "code",
            title: "Valores por defecto y argumentos con nombre",
            code: `def presentar(nombre, ciudad="Madrid", edad=None):
    texto = f"{nombre} de {ciudad}"
    if edad:
        texto += f" ({edad} años)"
    return texto

print(presentar("Ana"))                  # Ana de Madrid
print(presentar("Luis", "Valencia", 30)) # posicional
print(presentar("Luis", edad=30))        # con nombre`,
            en: {
              title: "Default values and keyword arguments",
              code: `def presentar(nombre, ciudad="Madrid", edad=None):
    texto = f"{nombre} de {ciudad}"
    if edad:
        texto += f" ({edad} years old)"
    return texto

print(presentar("Ana"))                  # Ana de Madrid
print(presentar("Luis", "Valencia", 30)) # positional
print(presentar("Luis", edad=30))        # keyword`,
            },
          },
          {
            type: "code",
            title: "*args y **kwargs",
            code: `def total(*numeros):
    return sum(numeros)

print(total(1, 2, 3, 4))        # 10

def perfil(**datos):
    for clave, valor in datos.items():
        print(f"{clave}: {valor}")

perfil(nombre="Ana", edad=25, ciudad="Madrid")
# nombre: Ana / edad: 25 / ciudad: Madrid`,
            en: {
              title: "*args and **kwargs",
              code: `def total(*numbers):
    return sum(numbers)

print(total(1, 2, 3, 4))        # 10

def profile(**data):
    for key, value in data.items():
        print(f"{key}: {value}")

profile(nombre="Ana", edad=25, ciudad="Madrid")
# nombre: Ana / edad: 25 / ciudad: Madrid`,
            },
          },
          {
            type: "note",
            tone: "warning",
            title: "El orden de los parámetros",
            text:
              "Los que tienen valor por defecto van **siempre al final**: `def f(a, b=2)` funciona, `def f(a=1, b)` es `SyntaxError`.",
            en: {
              title: "Parameter order",
              text:
                "Parameters with default values always go **at the end**: `def f(a, b=2)` works, `def f(a=1, b)` is a `SyntaxError`.",
            },
          },
          {
            type: "note",
            tone: "info",
            title: "*args y **kwargs",
            text:
              "`*args` recolecta los argumentos extra en una tupla; `**kwargs` los que llevan nombre en un dict. Nombres de convención, no obligatorios.",
            en: {
              title: "*args and **kwargs",
              text:
                "`*args` collects the extra arguments into a tuple; `**kwargs` the named ones into a dict. Convention names, not mandatory.",
            },
          },
        ],
      },
      {
        id: "return",
        title: "return y valores",
        desc: "Devolver resultados. ¿Y si no devuelve nada?",
        en: {
          title: "return and values",
          desc: "Return results. What if it returns nothing?",
        },
        blocks: [
          {
            type: "code",
            title: "return opcional",
            code: `def sin_return():
    print("hago algo")

print(sin_return())     # hago algo -> None

def dividir(a, b):
    if b == 0:
        return "división por cero"
    return a / b

print(dividir(10, 2))   # 5.0
print(dividir(10, 0))   # división por cero`,
            en: {
              title: "Optional return",
              code: `def sin_return():
    print("I do something")

print(sin_return())     # I do something -> None

def divide(a, b):
    if b == 0:
        return "division by zero"
    return a / b

print(divide(10, 2))    # 5.0
print(divide(10, 0))    # division by zero`,
            },
          },
          {
            type: "note",
            tone: "key",
            title: "Sin return, devuelve None",
            text:
              "Toda función devuelve algo. Si no hay `return`, devuelve `None` (la nada). Útil saberlo: `print(f())` imprime `None`.",
            en: {
              title: "Without return, it returns None",
              text:
                "Every function returns something. Without a `return`, it returns `None` (nothing). Good to know: `print(f())` prints `None`.",
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Otra vía: generadores",
            text:
              "`yield` convierte una función en generador: devuelve valores *al vuelo* sin construir toda la lista. Tema de nivel medio, pero muy elegante para cuando lo necesites.",
            en: {
              title: "Another way: generators",
              text:
                "`yield` turns a function into a generator: it yields values *on the fly* without building the whole list. An intermediate topic, but very elegant when you need it.",
            },
          },
        ],
      },
      {
        id: "lambda",
        title: "Funciones lambda",
        desc: "Funciones anónimas de una línea para pasar como argumento.",
        en: {
          title: "Lambda functions",
          desc: "One-line anonymous functions to pass as arguments.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Una función anónima de una sola expresión. Ideal para pasarla como argumento a `sorted`, `filter`, `map`...",
            en: {
              text:
                "An anonymous single-expression function. Ideal for passing as an argument to `sorted`, `filter`, `map`...",
            },
          },
          {
            type: "code",
            title: "Ejemplos útiles",
            code: `doble = lambda x: x * 2
print(doble(5))                          # 10

nombres = ["ana", "Carlos", "ben"]
ordenado = sorted(nombres, key=lambda s: s.lower())
print(ordenado)                          # ['ana', 'ben', 'Carlos']

pares = list(filter(lambda x: x % 2 == 0, range(10)))
print(pares)                             # [0, 2, 4, 6, 8]`,
            en: {
              title: "Useful examples",
              code: `double = lambda x: x * 2
print(double(5))                         # 10

names = ["ana", "Carlos", "ben"]
sorted_names = sorted(names, key=lambda s: s.lower())
print(sorted_names)                      # ['ana', 'ben', 'Carlos']

evens = list(filter(lambda x: x % 2 == 0, range(10)))
print(evens)                             # [0, 2, 4, 6, 8]`,
            },
          },
          {
            type: "note",
            tone: "info",
            title: "Es cuestión de estilo",
            text:
              "La lambda no tiene nombre y vale una sola expresión. Si la lógica se complica, una `def` con nombre se lee mejor.",
            en: {
              title: "It's a matter of style",
              text:
                "A lambda has no name and holds a single expression. If the logic gets complex, a named `def` reads better.",
            },
          },
        ],
      },
      {
        id: "scope",
        title: "Scope y global",
        desc: "Variables locales vs globales.",
        en: {
          title: "Scope and global",
          desc: "Local vs global variables.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Las variables creadas dentro de una función son **locales**: no existen fuera. Para modificar una variable del módulo dentro de una función, declárala con `global`.",
            en: {
              text:
                "Variables created inside a function are **local**: they don't exist outside. To modify a module-level variable from inside a function, declare it with `global`.",
            },
          },
          {
            type: "code",
            title: "global en acción",
            code: `contador = 0

def incrementar():
    global contador          # sin esto, contador sería otra variable
    contador += 1

incrementar()
incrementar()
print(contador)              # 2

# Leer una global sin declararla: permitido
def mostrar():
    print(contador)          # 2`,
            en: {
              title: "global in action",
              code: `counter = 0

def increment():
    global counter           # without this, counter would be another variable
    counter += 1

increment()
increment()
print(counter)               # 2

# Reading a global without declaring it: allowed
def show():
    print(counter)           # 2`,
            },
          },
          {
            type: "note",
            tone: "warning",
            text:
              "Olvida el `global` y la función creará una **otra** variable local con el mismo nombre: `contador += 1` lanzará `UnboundLocalError`.",
            en: {
              text:
                "Forget `global` and the function will create a **separate** local variable with the same name: `counter += 1` will raise `UnboundLocalError`.",
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "La alternativa moderna",
            text:
              "Usa `global` lo justo. Casi siempre es más limpio pasar el valor y devolverlo: funciones sin efectos ocultos, más predecibles y faciles de probar.",
            en: {
              title: "The modern alternative",
              text:
                "Use `global` sparingly. It's almost always cleaner to pass the value in and return it: functions without hidden effects, more predictable and easier to test.",
            },
          },
        ],
      },
      {
        id: "decoradores",
        title: "Decoradores",
        desc: "Envuelve una función para añadirle comportamiento sin tocarla.",
        en: {
          title: "Decorators",
          desc: "Wrap a function to add behavior without touching it.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Un decorador toma una función, la envuelve con otra que añade lógica antes y/o después, y devuelve la versión ampliada. Se aplica con `@nombre` justo encima de la definición.",
            en: {
              text:
                "A decorator takes a function, wraps it with another that adds logic before and/or after, and returns the enhanced version. It's applied with `@name` right above the definition.",
            },
          },
          {
            type: "h",
            text: "El patrón",
            en: { text: "The pattern" },
          },
          {
            type: "code",
            title: "El patrón",
            code: `def decorar(funcion):
    def envuelta(*args, **kwargs):
        print(f"Llamando a {funcion.__name__}")
        resultado = funcion(*args, **kwargs)
        print("Listo")
        return resultado
    return envuelta

@decorar
def sumar(a, b):
    return a + b

print(sumar(2, 3))`,
            en: {
              title: "The pattern",
              code: `def decorate(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print("Done")
        return result
    return wrapper

@decorate
def add(a, b):
    return a + b

print(add(2, 3))`,
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Conserva los metadatos",
            text:
              "`from functools import wraps` y `@wraps(funcion)` en la función interna copian el nombre y la documentación originales. Es obligatorio en bibliotecas y frameworks, y en tu código tampoco cuesta nada.",
            en: {
              title: "Keep the metadata",
              text:
                "`from functools import wraps` and `@wraps(func)` on the inner function copy the original name and docstring. It's required in libraries and frameworks, and it costs nothing in your own code either.",
            },
          },
          {
            type: "note",
            tone: "info",
            text:
              "Los frameworks los usan a diario: `@app.route(\"/\")` en Flask o `@cache` son decoradores. Cuando veas un `@`, sabes que la función de abajo pasa por esa envoltura.",
            en: {
              text:
                "Frameworks use them daily: `@app.route(\"/\")` in Flask or `@cache` are decorators. When you see a `@`, you know the function below goes through that wrapper.",
            },
          },
          {
            type: "note",
            tone: "key",
            title: "Se pueden apilar",
            text:
              "Varios `@` se aplican de abajo hacia arriba: el decorador que está más pegado a la función es el más interno y se ejecuta primero.",
            en: {
              title: "They can stack",
              text:
                "Several `@` apply from bottom to top: the decorator closest to the function is the innermost and runs first.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "objetos",
    title: "Objetos y clases",
    short: "Tu propio tipo de dato",
    blurb:
      "Clases para modelar el mundo real: atributos, métodos, herencia y el famoso self. La cereza del pastel de Python.",
    icon: "blocks",
    en: {
      title: "Objects",
      short: "Your own data type",
      blurb:
        "Classes to model the real world: attributes, methods, inheritance and the famous self. The cherry on top of Python.",
    },
    topics: [
      {
        id: "clases",
        title: "Clases y objetos",
        desc: "Una plantilla para crear cosas que saben hacer cosas.",
        en: {
          title: "Classes and objects",
          desc: "A blueprint for creating things that know how to do things.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Una clase es una plantilla; un objeto es una instancia de esa plantilla. `__init__` prepara cada objeto al crearlo y `self` es la propia instancia.",
            en: {
              text:
                "A class is a blueprint; an object is an instance of that blueprint. `__init__` sets up each object when it's created, and `self` is the instance itself.",
            },
          },
          {
            type: "h",
            text: "Tu primera clase",
            en: { text: "Your first class" },
          },
          {
            type: "code",
            title: "Tu primera clase",
            code: `class Mascota:
    def __init__(self, nombre, especie):
        self.nombre = nombre
        self.especie = especie

    def saludar(self):
        print(f"¡Hola! Soy {self.nombre} ({self.especie})")

michi = Mascota("Michi", "gato")
michi.saludar()   # ¡Hola! Soy Michi (gato)`,
            en: {
              title: "Your first class",
              code: `class Pet:
    def __init__(self, nombre, especie):
        self.nombre = nombre
        self.especie = especie

    def greet(self):
        print(f"Hi! I'm {self.nombre} ({self.especie})")

michi = Pet("Michi", "gato")
michi.greet()   # Hi! I'm Michi (gato)`,
            },
          },
          {
            type: "note",
            tone: "key",
            title: "self se rellena solo",
            text:
              "Nunca pasas `self`: Python lo hace por ti. Dentro de la clase, `self.nombre` es un atributo; fuera, se lee como `michi.nombre`.",
            en: {
              title: "self fills itself in",
              text:
                "You never pass `self`: Python does it for you. Inside the class, `self.nombre` is an attribute; outside, you read it as `michi.nombre`.",
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Los métodos dunder",
            text:
              "Los de doble guion bajo los llama Python en los momentos mágicos: `__init__` al crear, `__str__` al hacer `print(objeto)`, `__len__` con `len(objeto)`.",
            en: {
              title: "Dunder methods",
              text:
                "The double-underscore ones are called by Python in magic moments: `__init__` when creating, `__str__` when doing `print(objeto)`, `__len__` with `len(objeto)`.",
            },
          },
          {
            type: "note",
            tone: "warning",
            text:
              "Un método que solo usa `self` para llamar a otros métodos huele a que le sobra el parámetro: plantéate convertir ese comportamiento en una función normal.",
            en: {
              text:
                "A method that only uses `self` to call other methods may not need the parameter at all: consider turning that behavior into a regular function.",
            },
          },
        ],
        quiz: [
          {
            q: "¿Qué método se ejecuta automáticamente al crear un objeto?",
            options: ["__init__", "init()", "constructor()", "__new_obj__"],
            answer: 0,
            explain:
              "`__init__` inicializa la instancia justo al crearla con `Nombre(...)`.",
            en: {
              q: "Which method runs automatically when you create an object?",
              options: ["__init__", "init()", "constructor()", "__new_obj__"],
              explain:
                "`__init__` initializes the instance as soon as you create it with `Nombre(...)`.",
            },
          },
          {
            q: "En un método de clase, ¿qué representa `self`?",
            options: [
              "La clase en sí",
              "El objeto concreto que llama al método",
              "Un módulo importado",
              "La superclase",
            ],
            answer: 1,
            explain:
              "`self` es la referencia al objeto actual; por eso accedes a sus atributos.",
            en: {
              q: "In a class method, what does `self` represent?",
              options: [
                "The class itself",
                "The specific object calling the method",
                "An imported module",
                "The superclass",
              ],
              explain:
                "`self` is the reference to the current object; that's how you access its attributes.",
            },
          },
          {
            q: "`class Perro(Animal):` significa que…",
            options: [
              "Perro es padre de Animal",
              "Perro hereda de Animal",
              "Crea dos clases idénticas",
              "Es un error de sintaxis",
            ],
            answer: 1,
            explain:
              "La clase entre paréntesis es la base: `Perro` hereda sus métodos y atributos.",
            en: {
              q: "`class Perro(Animal):` means that…",
              options: [
                "Perro is Animal's parent",
                "Perro inherits from Animal",
                "It creates two identical classes",
                "It's a syntax error",
              ],
              explain:
                "The class in parentheses is the base: `Perro` inherits its methods and attributes.",
            },
          },
        ],
      },
      {
        id: "herencia",
        title: "Herencia y polimorfismo",
        desc: "Reutilizar y extender una clase partiendo de otra.",
        en: {
          title: "Inheritance and polymorphism",
          desc: "Reuse and extend a class starting from another.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Una clase puede heredar de otra: hereda sus métodos y atributos, y puede sobreescribirlos o añadir los suyos. `super()` llama a la versión del padre.",
            en: {
              text:
                "A class can inherit from another: it inherits its methods and attributes, and can override them or add its own. `super()` calls the parent's version.",
            },
          },
          {
            type: "h",
            text: "Heredar y sobreescribir",
            en: { text: "Inheriting and overriding" },
          },
          {
            type: "code",
            title: "Heredar y sobreescribir",
            code: `class Animal:
    def __init__(self, nombre):
        self.nombre = nombre

    def presentarse(self):
        print(f"Soy {self.nombre}")

class Mascota(Animal):
    def __init__(self, nombre, especie):
        super().__init__(nombre)
        self.especie = especie

    def presentarse(self):
        super().presentarse()
        print(f"Y soy un {self.especie}")

rex = Mascota("Rex", "perro")
rex.presentarse()`,
            en: {
              title: "Inheriting and overriding",
              code: `class Animal:
    def __init__(self, nombre):
        self.nombre = nombre

    def introduce(self):
        print(f"I'm {self.nombre}")

class Pet(Animal):
    def __init__(self, nombre, species):
        super().__init__(nombre)
        self.species = species

    def introduce(self):
        super().introduce()
        print(f"And I'm a {self.species}")

rex = Pet("Rex", "perro")
rex.introduce()`,
            },
          },
          {
            type: "note",
            tone: "key",
            title: "La sintaxis",
            text:
              "Heredar se escribe `class Hija(Padre):`. `super().__init__(...)` ejecuta el constructor del padre antes de darle el toque personal.",
            en: {
              title: "The syntax",
              text:
                "Inheritance is written `class Child(Parent):`. `super().__init__(...)` runs the parent's constructor before adding your personal touch.",
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Polimorfismo",
            text:
              "Si dos clases comparten métodos, un mismo bucle los trata igual: `for x in [perro, gato]: x.presentarse()` funciona sin importar la clase concreta.",
            en: {
              title: "Polymorphism",
              text:
                "If two classes share methods, the same loop treats them equally: `for x in [perro, gato]: x.introduce()` works regardless of the concrete class.",
            },
          },
          {
            type: "note",
            tone: "warning",
            title: "Prefiere la composición",
            text:
              "Cadenas de herencia profundas se lían pronto. Muchas veces es más limpio que una clase *contenga* otra (un coche tiene un motor) que *sea* otra.",
            en: {
              title: "Prefer composition",
              text:
                "Deep inheritance chains get tangled fast. Often it's cleaner for a class to *have* another (a car has an engine) than to *be* another.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "errores",
    title: "Errores y excepciones",
    short: "Fallar y salir airoso",
    blurb:
      "Capturar errores con try/except, conocer los errores típicos, lanzar excepciones propias y leer un traceback como un pro.",
    icon: "alert",
    en: {
      title: "Errors and exceptions",
      short: "Fail and come out on top",
      blurb:
        "Catch errors with try/except, know the typical errors, raise your own exceptions and read a traceback like a pro.",
    },
    topics: [
      {
        id: "tryexcept",
        title: "Manejar errores",
        desc: "try / except / else / finally.",
        en: {
          title: "Handling errors",
          desc: "try / except / else / finally.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Envuelve el código que puede fallar en `try` y decide qué hacer si algo sale mal en `except`.",
            en: {
              text:
                "Wrap the code that might fail in `try` and decide what to do if something goes wrong in `except`.",
            },
          },
          {
            type: "h",
            text: "try / except / else / finally",
            en: { text: "try / except / else / finally" },
          },
          {
            type: "code",
            title: "try / except / else / finally",
            code: `try:
    numero = int(input("Un número: "))
    resultado = 10 / numero
except ValueError:
    print("Eso no era un número")
except ZeroDivisionError:
    print("No se puede dividir por cero")
else:
    print(f"Resultado: {resultado}")   # solo si no hubo error
finally:
    print("Esto se ejecuta siempre")`,
            en: {
              title: "try / except / else / finally",
              code: `try:
    number = int(input("A number: "))
    result = 10 / number
except ValueError:
    print("That was not a number")
except ZeroDivisionError:
    print("Can't divide by zero")
else:
    print(f"Result: {result}")     # only if there was no error
finally:
    print("This always runs")`,
            },
          },
          {
            type: "note",
            tone: "key",
            title: "El orden lógico",
            text:
              "`try` intenta, `except` captura, `else` corre solo si no hubo error y `finally` corre pase lo que pase. No son obligatorios todos.",
            en: {
              title: "The logical order",
              text:
                "`try` attempts, `except` catches, `else` runs only if there was no error and `finally` runs no matter what. Not all of them are required.",
            },
          },
          {
            type: "note",
            tone: "tip",
            text:
              "Captura la excepción **más específica** que puedas. Un `except Exception` a secas se traga cualquier error, incluidos los tuyos por descuido, y oculta bugs.",
            en: {
              text:
                "Catch the most **specific** exception you can. A bare `except Exception` swallows every error, including your own careless ones, and hides bugs.",
            },
          },
        ],
        quiz: [
          {
            q: "¿Para qué sirve `try` / `except`?",
            options: [
              "Manejar errores sin que el programa se corte",
              "Optimizar el código",
              "Declarar variables globales",
              "Importar módulos",
            ],
            answer: 0,
            explain:
              "El bloque protege código: si algo falla, se ejecuta `except` en vez de reventar.",
            en: {
              q: "What is `try` / `except` for?",
              options: [
                "Handling errors without the program crashing",
                "Optimizing the code",
                "Declaring global variables",
                "Importing modules",
              ],
              explain:
                "The block protects code: if something fails, `except` runs instead of crashing.",
            },
          },
          {
            q: "`except ValueError:` captura…",
            options: [
              "Cualquier error",
              "Solo errores `ValueError`",
              "Solo errores de sintaxis",
              "Nada",
            ],
            answer: 1,
            explain:
              "Capturas específicas se escriben explícitas; deja `except:` para lo general.",
            en: {
              q: "`except ValueError:` catches…",
              options: [
                "Any error",
                "Only `ValueError` errors",
                "Only syntax errors",
                "Nothing",
              ],
              explain:
                "Specific catches are written explicitly; leave `except:` for the general case.",
            },
          },
          {
            q: "¿Cuándo se ejecuta `finally`?",
            options: [
              "Siempre, haya o no error",
              "Solo si hay error",
              "Solo si no hay error",
              "Nunca se ejecuta",
            ],
            answer: 0,
            explain:
              "`finally` es para limpieza: corre siempre, incluso si hay `return` en el `try`.",
            en: {
              q: "When does `finally` run?",
              options: [
                "Always, error or not",
                "Only if there's an error",
                "Only if there's no error",
                "It never runs",
              ],
              explain:
                "`finally` is for cleanup: it always runs, even if there's a `return` in the `try`.",
            },
          },
        ],
      },
      {
        id: "tipos-error",
        title: "Errores comunes",
        desc: "Qué significan y cómo evitarlos.",
        en: {
          title: "Common errors",
          desc: "What they mean and how to avoid them.",
        },
        blocks: [
          {
            type: "p",
            text:
              "El 80% de los errores al empezar son de estos seis. Reconocerlos de un vistazo es la mitad de la batalla:",
            en: {
              text:
                "80% of the errors when you start out are these six. Recognizing them at a glance is half the battle:",
            },
          },
          {
            type: "table",
            caption: "Los clásicos",
            headers: ["Error", "Por qué pasa", "Cómo evitarlo"],
            rows: [
              ["SyntaxError", "Falta una coma, paréntesis o sangría", "Revisa la línea exacta que marca"],
              ["NameError", "Nombraste algo que no existe", "¿Hay un typo? ¿Está antes definido?"],
              ["TypeError", "Operación imposible entre esos tipos", "¿int + str? Convierte antes"],
              ["ValueError", "Valor válido pero con sentido imposible", "int('hola') no tiene sentido"],
              ["IndexError", "Índice fuera del rango de la secuencia", "Lista de 3, mi_lista[9]"],
              ["KeyError", "La clave indicada no está en el dict", "Usa .get() si puede faltar"],
              ["ZeroDivisionError", "Dividir entre cero", "Valida el divisor antes"],
            ],
            en: {
              caption: "The classics",
              headers: ["Error", "Why it happens", "How to avoid it"],
              rows: [
                ["SyntaxError", "Missing comma, parenthesis or indentation", "Check the exact line it points to"],
                ["NameError", "You named something that doesn't exist", "A typo? Was it defined before?"],
                ["TypeError", "Operation impossible between those types", "int + str? Convert first"],
                ["ValueError", "Valid value but impossible meaning", "int('hola') makes no sense"],
                ["IndexError", "Index out of the sequence's range", "List of 3 items, mi_lista[9]"],
                ["KeyError", "The key isn't in the dict", "Use .get() if it might be missing"],
                ["ZeroDivisionError", "Dividing by zero", "Validate the divisor first"],
              ],
            },
          },
          {
            type: "code",
            title: "Anticiparse con un except",
            code: `usuario = {"nombre": "Ana"}

try:
    print(usuario["email"])
except KeyError:
    print("La clave 'email' no existe")   # la clave no existe`,
            en: {
              title: "Getting ahead with an except",
              code: `usuario = {"nombre": "Ana"}

try:
    print(usuario["email"])
except KeyError:
    print("The key 'email' doesn't exist")   # the key doesn't exist`,
            },
          },
        ],
      },
      {
        id: "raise",
        title: "Lanzar excepciones",
        desc: "Frenar la ejecución tú mismo con raise.",
        en: {
          title: "Raising exceptions",
          desc: "Stop execution yourself with raise.",
        },
        blocks: [
          {
            type: "p",
            text:
              "No solo Python lanza errores: tú también puedes, con `raise`. Útil para frenar cuando un valor es imposible y avisar al que llame a tu función.",
            en: {
              text:
                "Python isn't the only one raising errors: you can too, with `raise`. Useful for stopping when a value is impossible and warning whoever calls your function.",
            },
          },
          {
            type: "code",
            title: "raise en acción",
            code: `def celsius_a_fahrenheit(c):
    if not isinstance(c, (int, float)):
        raise TypeError("La temperatura debe ser un número")
    return c * 9 / 5 + 32

print(celsius_a_fahrenheit(20))    # 68.0

# celsius_a_fahrenheit("frío")     -> TypeError: La temperatura...`,
            en: {
              title: "raise in action",
              code: `def celsius_to_fahrenheit(c):
    if not isinstance(c, (int, float)):
        raise TypeError("The temperature must be a number")
    return c * 9 / 5 + 32

print(celsius_to_fahrenheit(20))   # 68.0

# celsius_to_fahrenheit("cold")    -> TypeError: The temperature...`,
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Mensajes que se expliquen solos",
            text:
              "Quien reciba tu error debe entender el problema sin abrir tu código. \"La temperatura debe ser un número\" dice más que \"Error en línea 4\".",
            en: {
              title: "Messages that explain themselves",
              text:
                "Whoever receives your error should understand the problem without opening your code. \"The temperature must be a number\" says more than \"Error on line 4\".",
            },
          },
        ],
      },
      {
        id: "traceback",
        title: "Leer un traceback",
        desc: "Léelo desde el final: ahí está todo.",
        en: {
          title: "Reading a traceback",
          desc: "Read it from the end: that's where everything is.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Cuando algo falla, Python imprime el *traceback*: el recorrido de llamadas, de abajo hacia arriba. **Léelo desde el final.**",
            en: {
              text:
                "When something fails, Python prints the *traceback*: the call path, from bottom to top. **Read it from the end.**",
            },
          },
          {
            type: "code",
            title: "Un crash en cámara lenta (pulsa Probar)",
            code: `def nivel_dos():
    return 10 / 0

def nivel_uno():
    return nivel_dos()

nivel_uno()

# Traceback (most recent call last):
#   File "main.py", line 8, in <module>
#     nivel_uno()
#   File "main.py", line 6, in nivel_uno
#     return nivel_dos()
#   File "main.py", line 3, in nivel_dos
#     return 10 / 0              <- el lugar exacto del error
# ZeroDivisionError: division by zero   <- el tipo de error`,
            en: {
              title: "A crash in slow motion (press Run)",
              code: `def level_two():
    return 10 / 0

def level_one():
    return level_two()

level_one()

# Traceback (most recent call last):
#   File "main.py", line 8, in <module>
#     level_one()
#   File "main.py", line 6, in level_one
#     return level_two()
#   File "main.py", line 3, in level_two
#     return 10 / 0               <- the exact place of the error
# ZeroDivisionError: division by zero   <- the type of error`,
            },
          },
          {
            type: "note",
            tone: "key",
            title: "Las dos últimas filas",
            text:
              "La fila de abajo del todo dice qué error es (`ZeroDivisionError`). La anterior, la línea de código concreta donde saltó. El resto solo te cuenta por dónde pasó la llamada.",
            en: {
              title: "The last two lines",
              text:
                "The bottom line tells you what the error is (`ZeroDivisionError`). The one above is the specific code line where it fired. The rest just tells you which calls led there.",
            },
          },
          {
            type: "note",
            tone: "info",
            text:
              "En cada ficha del manual, cuando pulses **Probar** y salga un error, esa salida es exactamente esto: un traceback. Ahora sabrás leerlo.",
            en: {
              text:
                "On every card in the manual, when you press **Run** and an error comes out, that output is exactly this: a traceback. Now you'll know how to read it.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "archivos",
    title: "Archivos y datos",
    short: "Persistir información",
    blurb:
      "Leer y escribir archivos de texto, trabajar con JSON y CSV, y organizar el código en módulos.",
    icon: "file",
    en: {
      title: "Files and data",
      short: "Persisting information",
      blurb:
        "Read and write text files, work with JSON and CSV, and organize code into modules.",
    },
    topics: [
      {
        id: "leer",
        title: "Leer archivos",
        desc: "open(), with, encoding y leer línea a línea.",
        en: {
          title: "Reading files",
          desc: "open(), with, encoding and reading line by line.",
        },
        blocks: [
          {
            type: "p",
            text:
              "`open()` abre un archivo. El contexto `with` garantiza que se cierre solo, incluso si salta un error. El modo por defecto, `'r'` (read), abre en texto.",
            en: {
              text:
                "`open()` opens a file. The `with` context guarantees it closes itself, even if an error occurs. The default mode, `'r'` (read), opens it as text.",
            },
          },
          {
            type: "code",
            title: "Tres formas de leer",
            code: `with open("notas.txt", "r", encoding="utf-8") as archivo:
    contenido = archivo.read()        # todo el texto de una vez
print(contenido)

with open("notas.txt", "r", encoding="utf-8") as archivo:
    lineas = archivo.readlines()      # lista de líneas
print(lineas)

# La más limpia y eficiente: iterar
with open("notas.txt", "r", encoding="utf-8") as archivo:
    for linea in archivo:
        print(linea.strip())`,
            en: {
              title: "Three ways to read",
              code: `with open("notes.txt", "r", encoding="utf-8") as file:
    content = file.read()         # all the text at once
print(content)

with open("notes.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()      # list of lines
print(lines)

# The cleanest and most efficient: iterate
with open("notes.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())`,
            },
          },
          {
            type: "note",
            tone: "warning",
            title: "El encodage es tu amigo",
            text:
              "Omite `encoding=\"utf-8\"` y los acentos lanzarán `UnicodeDecodeError`. En Windows, sin esto, cuidado con los textos que no sean ASCII.",
            en: {
              title: "The encoding is your friend",
              text:
                "Omit `encoding=\"utf-8\"` and accents will raise `UnicodeDecodeError`. On Windows, without it, be careful with non-ASCII texts.",
            },
          },
          {
            type: "note",
            tone: "tip",
            text:
              "`read()` consume el archivo: si llamas a `read()` y luego a `readlines()`, la segunda devuelve una lista vacía. El puntero ya está al final.",
            en: {
              text:
                "`read()` consumes the file: if you call `read()` and then `readlines()`, the second returns an empty list. The pointer is already at the end.",
            },
          },
        ],
      },
      {
        id: "escribir",
        title: "Escribir archivos",
        desc: "Modos w, a, x y cómo no borrar lo tuyo.",
        en: {
          title: "Writing files",
          desc: "Modes w, a, x and how not to erase your stuff.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Escribir funciona igual que leer pero con modos de apertura que deciden qué pasa si el archivo ya existe.",
            en: {
              text:
                "Writing works like reading but with opening modes that decide what happens if the file already exists.",
            },
          },
          {
            type: "table",
            caption: "Modos de apertura",
            headers: ["Modo", "Qué hace", "¿Y si no existe?"],
            rows: [
              ["r", "Lee", "FileNotFoundError"],
              ["w", "Escribe (borra lo anterior)", "Lo crea"],
              ["a", "Añade al final", "Lo crea"],
              ["x", "Crea (falla si ya existe)", "Lo crea"],
              ["r+", "Lee y escribe", "FileNotFoundError"],
            ],
            en: {
              caption: "Opening modes",
              headers: ["Mode", "What it does", "If it doesn't exist?"],
              rows: [
                ["r", "Reads", "FileNotFoundError"],
                ["w", "Writes (erases what was there)", "Creates it"],
                ["a", "Appends at the end", "Creates it"],
                ["x", "Creates (fails if it already exists)", "Creates it"],
                ["r+", "Reads and writes", "FileNotFoundError"],
              ],
            },
          },
          {
            type: "code",
            title: "Escribir texto",
            code: `with open("salida.txt", "w", encoding="utf-8") as archivo:
    archivo.write("Primera línea\\n")
    archivo.writelines(["Segunda\\n", "Tercera\\n"])

# Para no borrar lo que había:
with open("salida.txt", "a", encoding="utf-8") as archivo:
    archivo.write("Cuarta línea\\n")`,
            en: {
              title: "Writing text",
              code: `with open("output.txt", "w", encoding="utf-8") as file:
    file.write("First line\\n")
    file.writelines(["Second\\n", "Third\\n"])

# To avoid erasing what was there:
with open("output.txt", "a", encoding="utf-8") as file:
    file.write("Fourth line\\n")`,
            },
          },
          {
            type: "note",
            tone: "warning",
            text:
              "`\"w\"` **borra** el contenido previo sin avisar. Si te da miedo, usa `\"a\"` o `\"x\"` para no pisar nada.",
            en: {
              text:
                "`\"w\"` **erases** previous content without warning. If that scares you, use `\"a\"` or `\"x\"` so nothing gets overwritten.",
            },
          },
          {
            type: "note",
            tone: "info",
            text:
              "Windows y los saltos de línea: Python normaliza `\\n` a lo que toque al escribir (y lo traduce al leer). Escribir en texto suele ser transparente.",
            en: {
              text:
                "Windows and line breaks: Python normalizes `\\n` to whatever is needed when writing (and translates it back when reading). Writing text is usually transparent.",
            },
          },
        ],
      },
      {
        id: "json",
        title: "JSON",
        desc: "El estándar para guardar y compartir datos.",
        en: {
          title: "JSON",
          desc: "The standard for storing and sharing data.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Es el formato de datos por excelencia: legible, universal y nativo en Python. `json.dump` escribe, `json.load` lee.",
            en: {
              text:
                "It's the quintessential data format: readable, universal and native to Python. `json.dump` writes, `json.load` reads.",
            },
          },
          {
            type: "h",
            text: "Guardar y recuperar",
            en: { text: "Store and retrieve" },
          },
          {
            type: "code",
            title: "Guardar y recuperar",
            code: `import json

datos = {"nombre": "Ana", "hobbies": ["leer", "python"], "edad": 25}

with open("datos.json", "w", encoding="utf-8") as f:
    json.dump(datos, f, ensure_ascii=False, indent=2)

with open("datos.json", "r", encoding="utf-8") as f:
    cargado = json.load(f)

print(cargado["hobbies"][1])     # python
print(cargado)`,
            en: {
              title: "Store and retrieve",
              code: `import json

data = {"name": "Ana", "hobbies": ["reading", "python"], "age": 25}

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)

print(loaded["hobbies"][1])      # python
print(loaded)`,
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "ensure_ascii e indent",
            text:
              "`ensure_ascii=False` conserva acentos y emojis tal cual; `indent=2` deja el JSON con formato legible. Petición de estilo en casi todos los proyectos.",
            en: {
              title: "ensure_ascii and indent",
              text:
                "`ensure_ascii=False` keeps accents and emojis as-is; `indent=2` leaves the JSON with readable formatting. A style request in almost every project.",
            },
          },
          {
            type: "note",
            tone: "warning",
            title: "Lo que JSON sabe guardar",
            text:
              "Solo `str`, `int`, `float`, `bool`, `list`, `dict` y `None`. Un `set` o una `datetime` darán `TypeError`. Convierte esos valores antes.",
            en: {
              title: "What JSON can store",
              text:
                "Only `str`, `int`, `float`, `bool`, `list`, `dict` and `None`. A `set` or a `datetime` will raise `TypeError`. Convert those values first.",
            },
          },
        ],
        quiz: [
          {
            q: "¿Qué devuelve `json.loads(texto)`?",
            options: [
              "Un objeto de Python (dict, list…) a partir de texto JSON",
              "Un texto bonito a partir de un dict",
              "Nada",
              "Siempre una lista vacía",
            ],
            answer: 0,
            explain:
              "`json.loads` parsea un *string* JSON a tipos de Python.",
            en: {
              q: "What does `json.loads(text)` return?",
              options: [
                "A Python object (dict, list…) from JSON text",
                "A pretty text from a dict",
                "Nothing",
                "Always an empty list",
              ],
              explain:
                "`json.loads` parses a JSON *string* into Python types.",
            },
          },
          {
            q: "`json.dump(datos, f)`…",
            options: [
              "Lee JSON",
              "Escribe `datos` como JSON en el archivo `f`",
              "Borra el archivo",
              "Imprime `datos` por pantalla",
            ],
            answer: 1,
            explain:
              "`dump` (sin s) escribe en un archivo; `dumps` devuelve el texto.",
            en: {
              q: "`json.dump(data, f)`…",
              options: [
                "Reads JSON",
                "Writes `data` as JSON into file `f`",
                "Deletes the file",
                "Prints `data` to the screen",
              ],
              explain:
                "`dump` (no s) writes into a file; `dumps` returns the text.",
            },
          },
          {
            q: "El `true` del JSON, ¿a qué tipo de Python corresponde?",
            options: ["True", "true", "1", "Ninguno"],
            answer: 0,
            explain:
              "El parser traduce `true` → `True`, `false` → `False`, `null` → `None`.",
            en: {
              q: "What Python type does JSON's `true` map to?",
              options: ["True", "true", "1", "None"],
              explain:
                "The parser maps `true` → `True`, `false` → `False`, `null` → `None`.",
            },
          },
        ],
      },
      {
        id: "csv",
        title: "CSV",
        desc: "Tablas separadas por comas sin que se te cuelen las comillas.",
        en: {
          title: "CSV",
          desc: "Comma-separated tables without quotes sneaking in.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Para tablas separadas por comas, el módulo `csv` te ahorra el dolor de las comas dentro de los propios datos.",
            en: {
              text:
                "For comma-separated tables, the `csv` module saves you the pain of commas inside the data itself.",
            },
          },
          {
            type: "h",
            text: "Escribir y leer",
            en: { text: "Write and read" },
          },
          {
            type: "code",
            title: "Escribir y leer",
            code: `import csv

with open("alumnos.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["nombre", "nota"])
    writer.writerow(["Ana", 9.5])
    writer.writerow(["Luis", 7.2])

with open("alumnos.csv", "r", encoding="utf-8") as f:
    for fila in csv.reader(f):
        print(fila)

# ['nombre', 'nota']
# ['Ana', '9.5']
# ['Luis', '7.2']`,
            en: {
              title: "Write and read",
              code: `import csv

with open("students.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "grade"])
    writer.writerow(["Ana", 9.5])
    writer.writerow(["Luis", 7.2])

with open("students.csv", "r", encoding="utf-8") as f:
    for row in csv.reader(f):
        print(row)

# ['name', 'grade']
# ['Ana', '9.5']
# ['Luis', '7.2']`,
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "En Windows, newline=\"\"",
            text:
              "Como `newline=\"\"` evita las líneas en blanco extra al escribir en Windows. Parece na, pero no hace falta sufrirlo.",
            en: {
              title: "On Windows, newline=\"\"",
              text:
                "Adding `newline=\"\"` avoids extra blank lines when writing on Windows. Seems like nothing, but you don't need to suffer it.",
            },
          },
          {
            type: "note",
            tone: "info",
            text:
              "Con `csv.DictReader` las filas llegan como dicts usando la primera fila de cabecera como claves: `fila[\"nota\"]`.",
            en: {
              text:
                "With `csv.DictReader` rows arrive as dicts using the first header row as keys: `row[\"nota\"]`.",
            },
          },
        ],
      },
      {
        id: "import",
        title: "Módulos y import",
        desc: "Organiza el código y trae superpoderes de la stdlib.",
        en: {
          title: "Modules and import",
          desc: "Organize your code and bring superpowers from the stdlib.",
        },
        blocks: [
          {
            type: "p",
            text:
              "Python trae una biblioteca estándar enorme. Con `import` la traes a tu código y con módulos propios organizas el tuyo.",
            en: {
              text:
                "Python ships with a huge standard library. With `import` you bring it into your code, and with your own modules you organize yours.",
            },
          },
          {
            type: "code",
            title: "Del playground",
            code: `import math
import random
from datetime import datetime

print(math.sqrt(16))            # 4.0
print(math.pi)                  # 3.141592653589793
print(random.randint(1, 6))     # un dado que funcione
print(datetime.now().year)      # el año en curso`,
            en: {
              title: "From the playground",
              code: `import math
import random
from datetime import datetime

print(math.sqrt(16))            # 4.0
print(math.pi)                  # 3.141592653589793
print(random.randint(1, 6))     # a working die
print(datetime.now().year)      # the current year`,
            },
          },
          {
            type: "note",
            tone: "tip",
            title: "Import con orden",
            text:
              "Convención: primero librería estándar, luego terceros, luego las tuyas. Y `from x import y` cuando solo quieras una pieza concreta.",
            en: {
              title: "Imports in order",
              text:
                "Convention: standard library first, then third-party, then yours. And `from x import y` when you only want a specific piece.",
            },
          },
          {
            type: "note",
            tone: "warning",
            text:
              "`from math import *` mete todo el módulo en tu espacio y puede pisar nombres. Mejor importar lo concreto y saber qué hay en cada momento.",
            en: {
              text:
                "`from math import *` dumps the whole module into your namespace and can shadow names. Better to import what you need and always know what's there.",
            },
          },
        ],
      },
    ],
  },
]

const ICONS = {
  box: "box",
  type: "type",
  layers: "layers",
  branch: "branch",
  braces: "braces",
  alert: "alert",
  file: "file",
  blocks: "blocks",
}

export function getIconName(categoryId) {
  return ICONS[categoryId] ?? "box"
}

export function getCategory(categoryId) {
  return categories.find((c) => c.id === categoryId)
}

export function getTopic(categoryId, topicId) {
  const category = getCategory(categoryId)
  return category?.topics.find((t) => t.id === topicId)
}

export function findTopic(hash) {
  // hash formato: #/categoria/tema
  const parts = hash.replace(/^#\/?/, "").split("/")
  const categoryId = parts[0] || ""
  const topicId = parts[1] || ""
  const topic = categoryId && topicId ? getTopic(categoryId, topicId) : null
  if (topic) return { category: getCategory(categoryId), topic }
  // fallback a home
  return null
}

export function allTopics() {
  return categories.flatMap((c) =>
    c.topics.map((t) => ({ category: c, topic: t })),
  )
}

export const totals = {
  categories: categories.length,
  topics: categories.reduce((acc, c) => acc + c.topics.length, 0),
}