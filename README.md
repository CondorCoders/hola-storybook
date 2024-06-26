# ¡Hola Storybook!

En este repositorio encontrarás un paso a paso de cómo usar Storybook con tus proyectos React (usaremos Typescript). Aprenderemos con el proyecto más popular para aprender, crearemos un TO-DO List.

⚠️ Puedes empezar siguiendo los pasos de este readme o con el código de la rama `1-Introducción`

## Links

🔗 [Storybook Documentacion](https://storybook.js.org/)</br>

## Tabla de contenidos

- [Introducción](#introducción)

  - [¿Qué es Storybook?](#storybook)
  - [¿Por qué usar Storybook?](#casos-de-uso)

- [Component-Driven Development](#component-driven-development)

- [01 Instalación, configuración, ¿Qué es una Story? y cómo documentar tus componentes](#01-instalación-configuración-story-y-cómo-documentar-tus-componentes)

  - [Configuración de Storybook](#configuración-de-storybook)
  - [Carpeta src/stories](#carpeta-srcstories)
  - [Estructura de una story en typescript](#esctructura-de-una-story-en-typescript)

- [02 Estilos Globales, Decoradores y Herramienta personalizada en el Toolbar](#02-estilos-globales-decoradores-y-herramienta-personalizada-en-el-toolbar)

  - [Estilos Globales](#estilos-globales)
  - [Decorators](#decorators)
    - [Dark y Light mode con Decorators](#dark-y-light-mode-con-decorators)
  - [Creamos una herramienta personalizada en el Toolbar](#creamos-una-herramienta-personalizada-en-el-toolbar)

- [03 Mock de Datos con el addon MSW](#03-mock-de-datos-con-el-addon-msw)

  - [Creamos un componente para renderizar una lista de ToDos](#creamos-un-componente-para-renderizar-una-lista-de-todos)
  - [Agregamos la extensión de MSW](#agregamos-la-extensión-de-msw)

- [04 Accesibilidad y Testing](#04-accesibilidad-y-testing)
  - [Extensión de Accesibilidad](#extensión-de-accesibilidad)
  - [Testing con Play()](#testing-con-play)

## Introducción

### Storybook

Storybook es una herramienta de desarrollo de UI que permite crear componentes de forma aislada y visualizar el estado de cada componente de manera interactiva. Proporciona un entorno de desarrollo donde puedes diseñar, probar y documentar los componentes de tu aplicación de forma independiente.

[Ejemplo GitLab Storybook](https://gitlab-org.gitlab.io/gitlab-ui/?path=/docs/base-accordion--docs)

### Casos de uso

- **Desarrollo aislado:** Permite desarrollar componentes de forma aislada, lo que facilita la identificación y resolución de problemas de manera más eficiente.
- **Documentación automática:** Genera documentación automáticamente a partir de los comentarios y ejemplos proporcionados en las stories.
- **Pruebas visuales:** Proporciona un entorno interactivo para probar y visualizar los componentes en diferentes estados y casos de uso, lo que ayuda a detectar problemas de diseño y comportamiento de manera temprana en el proceso de desarrollo.
- **Extensiones:** Los addons pueden ayudar a evaluar la accesibilidad de nuestros componentes y otras funcionalidades.

## Component-Driven Development

En lugar de desarrollar funcionalidades completas de la aplicación de una vez, se concentra en el desarrollo incremental de componentes que componen la UI.

## 01 Instalación, configuración, Story y cómo documentar tus componentes

1.  Crearemos un nuevo proyecto con React usando Typescript.

    `npx create-react-app hola-storybook --template typescript cd hola-storybook`

2.  Instala Storybook
    `npx storybook@latest init`
3.  Comprueba que los distintos entornos funcionan </br>

    ````# Ejecuta Storybook con
    pnpm storybook
    npm run storybook

        # Ejecta la app con
        pnpm start
        ```

    Si todo salió bien Storybook correrá en el puerto `6006` y puedes cambiarlo en el archivo `package.json`
    ````

Veamos los archivos que se crearon:

```
|__ .storybook
    |__ main.ts
    |__ preview.ts
|__ src
    |__stories

```

### Configuración de Storybook

El archivo `main.ts` contiene la configuración principal de Storybook para este proyecto. A continuación se describen las diferentes secciones y sus respectivas funciones:

- `stories`: Esta sección especifica los archivos que Storybook debe incluir como historias. En este caso, se incluyen archivos con las extensiones `.mdx` y `.stories.js`, `.jsx`, `.mjs`, `.ts` y `.tsx` ubicados en la carpeta `src`.

- `addons`: Aquí se especifican las extensiones que se agregarán a Storybook para mejorar su funcionalidad.

- `framework`: Esta sección especifica el framework que Storybook utilizará para compilar y ejecutar las historias. En este caso, se utiliza `@storybook/react-webpack5`.

- `docs`: Se agrega la configuración `autodocs` para habilitar la generación automática de documentación. Esta opción permite configurar la generación automática de documentación a nivel global (`true` o `false`) o por componente mediante la anotación `['autodocs'].

- `staticDirs`: Esta sección especifica directorios estáticos que deben ser servidos por Storybook. En este caso, se incluye el directorio `public` ubicado en la carpeta raíz del proyecto.

El archivo `preview.ts` de Storybook configura el entorno de visualización de las historias durante el desarrollo.

`controls`, configura los controles utilizados para modificar las propiedades de los componentes en tiempo real. Dentro de `controls`, se definen `matchers` que permiten asociar tipos de datos específicos con controles adecuados.

Por ejemplo, se define un matcher para los colores (`/(background|color)$/i`), lo que permitirá mostrar un selector de color para las propiedades que coincidan. También se define un matcher para fechas (`/Date$/`), lo que habilitará un selector de fechas para las propiedades que coincidan con ese patrón.

### Carpeta `src/stories`

La carpeta `src/stories` es generada por Storybook y contiene archivos que definen historias (stories) de componentes individuales. Las historias son representaciones de cómo se visualizan y se comportan los componentes en diferentes escenarios y estados dentro de la aplicación.

- **Archivos .stories.ts**: Estos archivos contienen las stories del component del mismo nombre. Cada historia puede incluir ejemplos de uso del componente en diferentes estados, configuraciones y variaciones.

- **Archivo .mdx**: Son utilizados para escribir historias utilizando Markdown y JSX. Esto permite crear historias más descriptivas y detalladas, ya que puedes incluir texto formateado, imágenes y otros elementos de Markdown junto con código JSX para representar el componente.

### Esctructura de una story en typescript

```Button.stories.tsx
const meta = {
    // Título y ruta
    title: "Ejemplo/Botón",
    component: Button,
    // Utilizado para modificar o agregar funcionalidades a preview. Más información: https://storybook.js.org/docs/api/parameters#story-parameters
    parameters: {
        // Parámetro opcional para centrar el componente en el Canvas. Más información: https://storybook.js.org/docs/configure/story-layout
        layout: "centrado",
    },
    // Este componente tendrá una entrada de Autodocs generada automáticamente: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // Cómo se presentan los controladores. Más información sobre argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        backgroundColor: { control: "color" },
    },
    // Los argumentos del componente: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Más información sobre cómo escribir historias con args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "Botón",
  },
};
```

### Documentación automática

Storybook puede crear la documentación de tu componente de manera automática al agregar la estructura de JSDocs `/** */`para documentar las props o lo que hace el componente.

Por ejemplo:

```Button.tsx
interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({...})
```

Una vez que corres Storybook, puedes ver los comentarios en el archivo `Docs`. Cada prop tendrá el texto en "description" en el area de los Controlers.

### Documentación con archivos .mdx

Los archivos MDX combinan Markdown y JavaScript/JSX para crear documentación.

Ejemplo con el component Button:

```Button.mdx
import { Canvas, Meta } from '@storybook/blocks';
<!-- Importar las stories -->
import * as ButtonStories from './Button.stories';
<!-- Link entre .mdx y las stories -->
<Meta of={ButtonStories} />
<!-- Markdown -->
# Button

Esto es un botón.

Utiliza el botón `primary` para acciones principales.
<!-- Insertar por historia -->
<Canvas of={ButtonStories.Primary} />

```

⚠️Recuerda que por default Storybook está configurado con `autodocs: "tag"` en `main.ts`. Lo que signfica que tenemos que especificar en el componente si queremos docs. Si ves `Button.stories.tsx`, este tendrá `tags: ["autodocs"]`, si queremos usar un archivo .mdx para documentar nuestro componente, tenemos que agregar `tags: ["false"]` en el componente para desactivar "autodocs".

Vamos a cambiar `.storybook/main.ts` para habilitar la documentación automática por default, así no tenemos que hacerlo en cada componente.

```.storybook/main.ts
docs: {
    autodocs: true,
  },
```

### Creamos nuestro primer componente y Stories

Vamos a crear el componente `ToDo`.

```src/components/ToDo.tsx
import React, { useState } from "react";
import styles from "./ToDo.module.css";

export interface ToDoProps {
  id: string;
  todo: string;
  isCompleted?: boolean;
}

export const ToDo = ({ id, todo, isCompleted = false }: ToDoProps) => {
  const [completed, setCompleted] = useState<boolean>(isCompleted);
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        id={id}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <span className={completed ? styles.completed : ""}>{todo}</span>
    </div>
  );
};

```

```src/components/ToDo.module.css
.completed {
    text-decoration: line-through;
}
```

Y ahora creemos sus stories en diferente estados. Cuando un `ToDo` no está completado y cuando sí está completado (isCompleted).

```src/components/ToDo.stories.ts
import { Meta } from "@storybook/react";
import { ToDo } from "./ToDo";

const meta = {
  title: "Components/ToDo",
  component: ToDo,
  args: {
    id: "1",
    todo: "Hola Mundo",
  },
} satisfies Meta<typeof ToDo>;

export default meta;

export const Default = {};

export const Completed = {
  args: {
    isCompleted: true,
  },
};

```

#### 🥇 Ejercicio: Agrega una descripción a cada prop y al componente y asegúrate que renderice de manera correcta en la documentación.

## 02 Estilos Globales, Decoradores y Herramienta personalizada en el Toolbar

⚠️ Código en la rama `2-EstilosGlobalesYDecoradores`

### Estilos Globales

Vamos a reemplazar el color del componente `button.css` con una variable de css `--primary`.

```button.css
.storybook-button--primary {
  color: white;
  background-color: var(--primary);
}
```

y crear la variable en `index.css`

```index.css
:root {
  --primary: #1ea7fd;
}
```

Lo más probable es que el color del botón no aparezca en el Story. Para que esto funcione debemos importar los estilos globales a `preview.ts`. Recordemos que `preview.ts` es la configuración del contenedor donde el Story de nuestro componente se renderiza y solo tiene acceso al código en el componente, por lo que es necesario importar cualquier estilo adicional.

```preview.ts
import type { Preview } from "@storybook/react";
import "../src/index.css"; <-- importamos css

const preview: Preview = {...};

export default preview;
```

### Decorators

Documentación oficial: [Storybook Decorators](https://storybook.js.org/docs/writing-stories/decorators#story-decorators)

Los "decorators" en Storybook son funciones que te permiten aplicar comportamientos o envolver componentes con funcionalidades adicionales en un Story. Los decorators se utilizan comúnmente para envolver componentes con ciertas configuraciones, como proveer datos simulados, aplicar estilos globales, o agregar contextos específicos para simular un entorno de aplicación más completo.

⚠️ Al momento de usar `Decorators` debemos cambiar nuestros archivos de `.stories.ts` a `.stories.tsx` ya que usarems `jsx|tsx|html`

Veamos ejemplo:

```ToDo.stories.tsx
const meta = {
  ...
  decorators: [
    (Story) => (
      <div style={{border: "2px solid red"}}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ToDo>;
```

Ahora deberías las Stories del componente `ToDo` con un borde rojo.

Los decorators son un array que puede aceptar varios. Por Ejemplo:

```ToDo.stories.tsx
const meta = {
  ...
  decorators: [
    (Story) => (
      <div style={{ border: "2px solid red" }}>
        <Story />
      </div>
    ),
    (Story) => (
      <div style={{ border: "2px solid green" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ToDo>;
```

El orden en que colocarmos los decoradores definirán el orden de renderizado. El borde verde debería envolver el borde rojo.

#### Dark y Light mode con Decorators

Vamos a agregar más estilos a nuestro componente `ToDo` y los colores en darkmode.

```ToDo.module.css
.completed {
    text-decoration: line-through;
}

.toDo {
    background-color: var(--grey);
    padding: 0.5rem;
    color: var(--text);
}
```

```index.css
:root {
  --primary: #1ea7fd;
  --text: black;
  --grey: #eee;
}

.dark-theme {
  background-color: #121212;
  --primary: #b4d7ff;
  --text: white;
  --grey: #282828
}
```

Y creamos un decorador que contenga la version light y darkmode de nuestro componente.

```ToDo.stories.tsx
const meta = {
  title: "Components/ToDo",
  component: ToDo,
  args: {
    id: "1",
    todo: "Hola Mundo",
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className={"dark-theme"}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ToDo>;
```

Ahora vamos a hacer que este Decorator se aplique de manera global. Así todos los componentes renderizarán el light y dark mode sin tener que agregarlo en cada Story del componente. Movamos los decoradores de `ToDo.stories.tsx` a `preview.ts`. Recuerda que debes cambiar el archivo a `preview.tsx`

```preview.tsx
import type { Preview } from "@storybook/react";
import "../src/index.css";
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className={"dark-theme"}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default preview;
```

Ahora todos los Stories de todos los componentes deben renderizar en light y dark mode.

#### Creamos una herramienta personalizada en el Toolbar

Documentación Oficial: [Toolbars & globals](https://storybook.js.org/docs/essentials/toolbars-and-globals)

Toolbar Annotations (Anotaciones en la Toolbar) son características que te permiten agregar información adicional y funcionalidades a la toolbar de Storybook. Estas anotaciones pueden incluir metadatos, controles interactivos y otros elementos que enriquecen la experiencia de desarrollo al visualizar tus historias.

Para esto vamos a definir un tipo `theme` en GlobalTypes en el archivo `preview.tsx`

```preview.tsx
const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Dark or Light mode",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark", "both"],
        dynamicTitle: true,
      },
    },
  },
  ...
};
```

📖 [Íconos disponibles para el toolbar](https://storybook.js.org/docs/faq#what-icons-are-available-for-my-toolbar-or-my-addon)

Ahora deberías ver una nueva herramienta en el Toolbar arriba de tus componentes con el nombre "light". Al darle click debes tener las opciones "dark" y "both". Sin embargo esto todavía no está conectado con nuestras Stories.

Ahora consumamos esta data del toolbar en nuestro Decorator.

```preview.tsx
const preview: Preview = {
  ...
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;

      if (theme === "light") {
        return <Story />;
      }

      if (theme === "dark") {
        return (
          <div className={"dark-theme"}>
            <Story />
          </div>
        );
      }

      return (
        <div>
          <Story />
          <div className={"dark-theme"}>
            <Story />
          </div>
        </div>
      );
    },
  ],
};
```

## 03 Mock de Datos con el addon MSW

⚠️ Código en la rama `3-MockDeDatosConMSW`

Documentación Oficial: [Mocking API Services](https://storybook.js.org/docs/writing-stories/build-pages-with-storybook#mocking-api-services)
Documentación de JSON Placeholder: [Guía](https://jsonplaceholder.typicode.com/guide/)

### Creamos un componente para renderizar una lista de ToDos

Vamos a crear un componente que cargue una lista de ToDos utilizando la API de JsonPlaceholder.

```ToDoList
import React, { useEffect, useState } from "react";
import { ToDo, ToDoProps } from "../ToDo/ToDo";

export const ToDoList = () => {
  const [todos, setTodos] = useState<ToDoProps[] | undefined>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setTodos(json);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <div>
      <h1>ToDo List</h1>
      {error && <p>Error loading todos</p>}
      {!error && todos?.map((todo) => <ToDo {...todo} />)}
    </div>
  );
};
```

Ahora actualicemos los tipos en el componente de `ToDo` para que sean igual a JsonPlaceholder.

```ToDo.tsx
import React, { useState } from "react";
import styles from "./ToDo.module.css";

export interface ToDoProps {
  id: number;
  title: string;
  completed?: boolean;
}

export const ToDo = ({
  id,
  title,
  completed: isCompleted = false,
}: ToDoProps) => {
  const [completed, setCompleted] = useState<boolean>(isCompleted);
  return (
    <div className={styles.toDo}>
      <input
        type="checkbox"
        checked={completed}
        id={id.toString()}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <span className={completed ? styles.completed : ""}>{title}</span>
    </div>
  );
};
```

⚠️ Recuerda actualizar el Story `ToDo.stories.tsx`

Ahora creemos el Story para nuestro componente `ToDoList`

```ToDoList.stories.tsx
import { Meta } from "@storybook/react";
import { ToDoList } from "./ToDoList";

const meta = {
  title: "Components/ToDoList",
  component: ToDoList,
} satisfies Meta<typeof ToDoList>;

export default meta;

export const Default = {};

```

Deberías de ver el Story del componente con 10 ToDos.

### Agregamos la extensión de MSW

Te recomiendo seguir las instrucciones de la página oficial para que estés al día con el proceso de instalación.

[MSW Storybook](https://storybook.js.org/addons/msw-storybook-addon)

En nuestro terminal correr el comando:

```
npm i msw msw-storybook-addon -D
```

Generamos el Service Worker en la carpeta pública.

```
npx msw init public/
```

Configuremos la extensión en `preview.tsx`:

```preview.tsx
import { initialize, mswLoader } from "msw-storybook-addon";

// Initialize MSW
initialize();

const preview: Preview = {
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
  ...
}
```

Ahora creamos un mock en nuestro componente `ToDoList` con la extensión de MSW. Para esto necesitaremos los datos falsos que queremos devolver.

Creamos una carpeta `__fixtures__` con un archivo `todos.ts`

```todos.ts
import { ToDoProps } from "../../ToDo/ToDo";

export const todos: ToDoProps[] = [
  {
    id: 1,
    title: "To Do 1",
    completed: false,
  },
  {
    id: 2,
    title: "To Do 2",
    completed: true,
  },
];

```

Dentro de nuestra Story del componente `ToDoList.stories.tsx` agregamos `msw`

```ToDoList.stories.tsx
import { Meta } from "@storybook/react";
import { ToDoList } from "./ToDoList";
import { http, HttpResponse } from "msw";
import { todos } from "./__fixtures__/todos";

const meta = {
  title: "Components/ToDoList",
  component: ToDoList,
  parameters: {
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos", () => {
          return HttpResponse.json(todos);
        }),
      ],
    },
  },
} satisfies Meta<typeof ToDoList>;

export default meta;

export const Default = {};

```

Ahora deberías ver los datos falsos en vez de los datos de JsonPlaceholder.

También podemos hacer un Mock para simular que la petición falló. Agregamos una nueva Story `Error`

```ToDoList.stories.tsx
import { Meta } from "@storybook/react";
import { ToDoList } from "./ToDoList";
import { http, HttpResponse } from "msw";
import { todos } from "./__fixtures__/todos";

const meta = {
  title: "Components/ToDoList",
  component: ToDoList,
} satisfies Meta<typeof ToDoList>;

export default meta;

export const Default = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos", () => {
          return HttpResponse.json(todos);
        }),
      ],
    },
  },
};

export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos", () => {
          return HttpResponse.error();
        }),
      ],
    },
  },
};

```

## 04 Accesibilidad y Testing

⚠️ Código en la rama `4-Accesibilidad-Tests`

### Extensión de Accesibilidad

[Documentación Oficial]: [Accessibility](https://storybook.js.org/addons/@storybook/addon-a11y)

Esta extensión oficial de Storybook te ayuda a detectar errores de accesibilidad y construir mejores componentes.

Instalamos desde el terminal:

```
npm install @storybook/addon-a11y
```

Agregamos la extensión a la configuración de Storybook `main.ts`.

```main.ts
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    ...
    "@storybook/addon-a11y", <- Agregar extensión
  ],
  ...
};
export default config;

```

Al ver tus Stories, aparecerá una nueva sección llamada `Accessibility` en los Controlers.

Aquí verás en rojo lo que debes mejorar en tu componente para que sea más accesible. Puedes darle click a ver la documentación donde también te dan sugerencias de cómo mejorarlo.

### Testing con Play()

[Documentación Oficial]: [Play](https://storybook.js.org/docs/writing-stories/play-function#writing-stories-with-the-play-function)

Play en Storybook es una función que permite interactuar con componentes de manera visual dentro del entorno de Storybook. Te permite simular interacciones del usuario con tus componentes y observar cómo se comportan en diferentes estados.

Vamos a agregar un input en `ToDoList` que nos eprmita agregar un todo.

```ToDoList.tsx
export const ToDoList = () => {
  const [todos, setTodos] = useState<ToDoProps[] | undefined>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => response.json())
      .then((json) => {
        setTodos(json);
      })
      .catch(() => setError(true));
  }, []);

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("todo") as string;

    if (!title) return;

    const newToDo: ToDoProps = {
      id: (todos?.length || 0) + 1,
      title,
      completed: false,
    };

    setTodos((prev) => prev && [newToDo, ...prev]);
    e.currentTarget.reset();
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <form onSubmit={onSave}>
        <input type="text" name="todo" id="todo" aria-label="todo" />
        <Button label="Guardar" primary type="submit" />
      </form>
      {error && <p>Error loading todos</p>}
      {!error && todos?.map((todo) => <ToDo {...todo} />)}
    </div>
  );
};
```

Ahora vamos a agregar `play` al Story

```ToDoList.stories.tsx
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const todoInput = canvas.getByLabelText("todo", { selector: "input" });

    await userEvent.type(todoInput, "Test 4");

    const saveButton = canvas.getByRole("button");
    await userEvent.click(saveButton);

    const newTodo = canvas.getByLabelText("Test 4", { selector: "input" });
    await expect(newTodo).toBeInTheDocument();
  },
  parameters: {...},
};
```

Si todo salió bien, verás como en la pestaña `Interactions` en el area de los Controlers aparecerá los pasos que definimos en `play`.
