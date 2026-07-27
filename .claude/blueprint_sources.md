# Blueprint: Sources Feature Implementation

## 1. Overview

The objective is to create a new feature module for managing "Sources". This feature will replicate the architecture and user experience of the existing "SMTP" feature. It will allow users to list, create, and update sources. Deletion functionality is explicitly not required.

The implementation will use standalone components and leverage PrimeNG's `DialogService` for modal forms, ensuring a consistent and modern user experience.

## 2. File Creation Plan

The following new files will be created within the `src/app/features/sources/` directory.

-   **API Service:**
		-   `sources.api.ts`: To handle HTTP communication with the backend for source-related data.

-   **Home Component (Container):**
		-   `sources-home/sources-home.component.ts`
		-   `sources-home/sources-home.component.html`
		-   `sources-home/sources-home.component.scss`

-   **List Component:**
		-   `sources-list/sources-list.component.ts`
		-   `sources-list/sources-list.component.html`
		-   `sources-list/sources-list.component.scss`

-   **Item Component:**
		-   `sources-item/sources-item.component.ts`
		-   `sources-item/sources-item.component.html`
		-   `sources-item/sources-item.component.scss`

-   **Form Component (Modal):**
		-   `sources-form/sources-form.component.ts`
		-   `sources-form/sources-form.component.html`

## 3. Implementation Details

### Step 1: Create the API Service

-   **`sources.api.ts`**:
		-   Create a `SourcesApi` class similar to `SmtpApi`.
		-   It will extend a base API service and define the endpoint as `/sources`.

### Step 2: Create the Core Components

-   **`sources-list.component.ts`**:
		-   Fetch a list of `iSource` objects using `SourcesService`.
		-   Display the list, iterating with `@for` and passing each source to an `app-sources-item` component.
		-   Implement a public `loadList()` method to allow parent components to trigger a data refresh.
		-   Use `ChangeDetectionStrategy.OnPush`.

-   **`sources-item.component.ts`**:
		-   Receive a single `iSource` object as an `@Input`.
		-   Display the source's properties (e.g., `name`, `type`).
		-   Include an "Edit" button that opens `SourcesFormComponent` in a dialog, passing the current source data.
		-   On dialog close (after a successful update), trigger `loadList()` on the parent `SourcesListComponent`.
		-   This will be a `standalone` component using `ChangeDetectionStrategy.OnPush`.

-   **`sources-home.component.ts`**:
		-   Act as the main container for the feature.
		-   Include `<app-sources-list>` in its template.
		-   Add a "New Source" button. On click, it will use `DialogService` to open `SourcesFormComponent`.
		-   Use `@ViewChild` to get a reference to `SourcesListComponent`.
		-   When the form dialog closes after a create or update action, call `this.listComponent.loadList()` to refresh the data.
		-   Use `ChangeDetectionStrategy.OnPush`.

-   **`sources-form.component.ts`**:
		-   This will be a `standalone` component for the modal dialog.
		-   Build a `FormGroup` based on the `iSource` interface from `source.interface.ts`.
		-   Inject `DynamicDialogRef` and `DynamicDialogConfig` to manage the modal state and receive data.
		-   Implement `onSubmit()` which will call either `sourcesService.create()` or `sourcesService.update()` based on whether it's a new or existing source.
		-   On successful submission, close the dialog and pass a result (`true`) to indicate that the list should be refreshed.
		-   A "Cancel" button will close the dialog without a result (`false` or `null`).
		-   No "Delete" button will be included, as per the requirements.

This blueprint provides a clear path to implementing the `sources` feature consistently with the existing application architecture.
