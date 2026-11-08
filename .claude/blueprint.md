# Blueprint: API Key Feature Implementation

## 1. Overview

The objective is to create a new feature module for managing "API Keys". This feature will replicate the architecture and user experience of the existing "Sources" feature. It will allow users to list, create, and update API keys. Deletion functionality is explicitly not required.

The implementation will use standalone components and leverage PrimeNG's `DialogService` for modal forms, ensuring a consistent and modern user experience.

## 2. File Creation Plan

The following new files will be created within the `src/app/features/apikey/` directory.

-   **API Service:**
    -   `apikey.api.ts`: To handle HTTP communication with the backend for API key-related data.

-   **Home Component (Container):**
    -   `apikey-home/apikey-home.component.ts`
    -   `apikey-home/apikey-home.component.html`
    -   `apikey-home/apikey-home.component.scss`

-   **List Component:**
    -   `apikey-list/apikey-list.component.ts`
    -   `apikey-list/apikey-list.component.html`
    -   `apikey-list/apikey-list.component.scss`

-   **Item Component:**
    -   `apikey-item/apikey-item.component.ts`
    -   `apikey-item/apikey-item.component.html`
    -   `apikey-item/apikey-item.component.scss`

-   **Form Component (Modal):**
    -   `apikey-form/apikey-form.component.ts`
    -   `apikey-form/apikey-form.component.html`

## 3. Implementation Details

### General Rules

-   **Do not touch `iApikey`. The interface is correct.**
-   **Do not touch `ApikeyApi`. The endpoints are correct.**
-   **Inspire in the existing components from `source` folder.**
-   **Do not change files outside `features/apikey`, unless strictly necessary.**
-   **The API requests already defined in `ApikeyApi` are also correct.**

### Step 1: Create the API Service

-   **`apikey.api.ts`**:
    -   Create a `ApikeyApi` class similar to `SourcesApi`.
    -   It will extend a base API service and define the endpoint as `/apikeys`.

### Step 2: Create the Core Components

-   **`apikey-list.component.ts`**:
    -   Fetch a list of `iApikey` objects using `ApikeyService`.
    -   Display the list, iterating with `@for` and passing each API key to an `app-apikey-item` component.
    -   Implement a public `loadList()` method to allow parent components to trigger a data refresh.
    -   Use `ChangeDetectionStrategy.OnPush`.

-   **`apikey-item.component.ts`**:
    -   Receive a single `iApikey` object as an `@Input`.
    -   Display the API key's properties (e.g., `name`, `token`).
    -   Include an "Edit" button that opens `ApikeyFormComponent` in a dialog, passing the current API key data.
    -   On dialog close (after a successful update), trigger `loadList()` on the parent `ApikeyListComponent`.
    -   This will be a `standalone` component using `ChangeDetectionStrategy.OnPush`.

-   **`apikey-home.component.ts`**:
    -   Act as the main container for the feature.
    -   Include `<app-apikey-list>` in its template.
    -   Add a "New API Key" button. On click, it will use `DialogService` to open `ApikeyFormComponent`.
    -   Use `@ViewChild` to get a reference to `ApikeyListComponent`.
    -   When the form dialog closes after a create or update action, call `this.listComponent.loadList()` to refresh the data.
    -   Use `ChangeDetectionStrategy.OnPush`.

-   **`apikey-form.component.ts`**:
    -   This will be a `standalone` component for the modal dialog.
    -   Build a `FormGroup` based on the `iApikey` interface from `apikey.interface.ts`.
    -   Inject `DynamicDialogRef` and `DynamicDialogConfig` to manage the modal state and receive data.
    -   Implement `onSubmit()` which will call either `apikeyService.create()` or `apikeyService.update()` based on whether it's a new or existing API key.
    -   On successful submission, close the dialog and pass a result (`true`) to indicate that the list should be refreshed.
    -   A "Cancel" button will close the dialog without a result (`false` or `null`).
    -   No "Delete" button will be included, as per the requirements.

This blueprint provides a clear path to implementing the `apikey` feature consistently with the existing application architecture.