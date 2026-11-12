# Add photo previews to the admin organization list

The backend now returns `imageUrl`, `imageSource`, and `imageCredit`.

In `admin/src/pages/ManageOrganizations.tsx`:

1. Add this import:

```tsx
import OrganizationPhoto from "../components/OrganizationPhoto";
```

2. Add these optional fields to the `Organization` type:

```tsx
imageUrl?: string;
imageSource?: string;
imageCredit?: string;
```

3. In the organization table, add a column header:

```tsx
<th className="p-4">Photo</th>
```

4. In each organization row, add a cell before the organization name cell:

```tsx
<td className="p-4">
  <OrganizationPhoto
    src={org.imageUrl}
    name={org.organizationName}
    className="h-16 w-24"
  />
</td>
```

5. Increase the table's empty/loading row `colSpan` by one.

The admin page displays the same database image URL as the public website. Changing the image mapping and rerunning the migration updates the records centrally.
