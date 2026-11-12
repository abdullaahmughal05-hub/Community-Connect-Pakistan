# Add photos to the public client

The API now returns `imageUrl`, `imageSource`, and `imageCredit` on each organization.

1. Import the component in `client/src/pages/Organizations.tsx`:

```tsx
import OrganizationPhoto from "../components/OrganizationPhoto";
```

2. Find the current placeholder/photo area inside each organization card (the area currently showing `OR`) and replace that area with:

```tsx
<OrganizationPhoto
  src={org.imageUrl}
  name={org.organizationName}
  credit={org.imageSource}
  className="h-48 w-full"
/>
```

Use your actual card organization variable if it is named something other than `org`.

3. In `client/src/pages/OrganizationDetails.tsx`, import the same component and place it in the organization hero/photo area:

```tsx
<OrganizationPhoto
  src={organization.imageUrl}
  name={organization.organizationName}
  credit={organization.imageSource}
  className="h-64 w-full rounded-2xl"
/>
```

Use the actual variable name from your file (`org`, `organization`, etc.).

Do not put a separate image lookup in each card. Every card reads its image URL from the MongoDB record.
