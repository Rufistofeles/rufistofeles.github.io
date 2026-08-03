/**
 * The fact sheet the assistant is allowed to speak from.
 *
 * This is the ONLY source of truth it has. If something is not in here it is
 * instructed to say so and hand over to email — it must never fill a gap with
 * a plausible guess, because the gap is somebody's employment history.
 *
 * Everything below is on the public page at https://rufistofeles.dev.
 * When the page changes, change this too — they are meant to agree.
 */

export const FACTS = `
# Rafael Pérez — fact sheet

## Identity
- Full name: Rafael Pérez (the accent is part of the name).
- Based in Mexico City, Mexico.
- Email: rafael@rufistofeles.dev — he answers it himself.
- Website: https://rufistofeles.dev
- GitHub: https://github.com/Rufistofeles
- LinkedIn: https://www.linkedin.com/in/rufistofeles
- Languages: Spanish (native), English (conversational).
- Currently open to .NET engineering roles.

## Experience summary
- Shipping .NET professionally since 2015. That is eleven years as of 2026.
- Trajectory: warehouse robotics (2015-2017), enterprise integration and web
  (2017-2019), identity and IoT (2019-present).
- Trained as a mechatronics engineer, works as a .NET engineer. He treats these
  as one discipline, not two careers.

## Current role — DOMO, Agencia de Desarrollo de Software (2019 - present)
Title: Web, M2M & IoT Developer. Mexico City.
- Single sign-on in production since 2019 using Azure AD and OpenID Connect,
  across BOTH web and desktop applications.
- Architected and deployed web applications in C#, ASP.NET MVC and .NET Core.
- Built SAP integration interfaces over SOAP and REST.
- Modernised legacy desktop systems, moving VB.NET applications into C#.
- Delivered electronic invoicing to Mexico's CFDI v3.3 and v4 standards —
  both issuance and supplier invoice receipt.

## Verquet SA de CV (2017 - 2019)
Title: Senior Web Consultant. Mexico City.
- Designed and built a business solutions web portal in ASP.NET MVC.
- Led development of a CFDI v3.3 electronic invoicing system — client invoice
  generation and supplier invoice processing.
- Gathered requirements directly with cross-functional teams.

## Andlogistics (2015 - 2017)
Title: WCS Developer Specialist. Mexico City.
- Built the warehouse control system for Layer Picker robots and Put-to-Light,
  in VB.NET, running on a real warehouse floor.
- Integrated the WCS with WMS Manhattan and AGV robots.
- Extended it to conveyors and sorter systems, with SAP and WMS integration.

## Open-source work
### RufistoWard — https://github.com/RufistofelesDev/RufistoWard
- An open-source OAuth 2.0 / OpenID Connect identity server on .NET 10.
- Licensed AGPL-3.0 with a commercial licence available (dual-licensed).
- Built because Duende priced IdentityServer out of reach for many teams and
  IdentityServer4 reached end of life. Every OAuth/OIDC flow in it is free.
- Ships with an admin UI for clients, scopes, users and roles, written in
  Tailwind CSS v4 and HTMX — no JavaScript framework.
- Includes migration tooling off IdentityServer4, written by someone who has
  moved production instances.
- The OpenID Foundation Basic OP and Config OP conformance plans are published
  and passing, and are publicly verifiable at certification.openid.net.
- It is his day job generalised: he has done identity professionally since 2019.

### Aspire.Hosting.OpcUa — https://github.com/RufistofelesDev/Aspire.Hosting.OpcUa
- An OPC UA hosting integration for .NET Aspire, licensed AGPL-3.0.
- Adds a simulated industrial PLC to an Aspire app model in one line, with no
  hardware required. Wraps Microsoft's OPC UA simulator as an Aspire resource.
- Fast nodes, slow nodes, GUID nodes and alarms are configurable from the app model.
- Built because no OPC UA integration existed in the Aspire Community Toolkit
  or on NuGet.

### Engineering thesis — home automation over the mains
- His first real system: house lights controlled over the electrical wiring,
  using the X10 protocol, an Arduino for transmission and a Raspberry Pi as the
  server.
- He built it because his mother has knee osteoarthritis and the light switch
  was across the room.
- Still online at https://rufistofeles.dev/thesis.html
- He describes the through-line of his career as: get a signal through a channel
  that was not built for it, and prove on the other side that it arrived intact.
  Lights over the mains, then machines over OPC UA, now tokens over HTTP.

## Technologies
- Daily: .NET 10, C#, ASP.NET Core, Entity Framework Core, OAuth 2.0 / OIDC,
  Azure AD, Clean Architecture.
- Around it: SQL Server, PostgreSQL, T-SQL, Docker, Azure DevOps, .NET Aspire,
  Tailwind CSS, HTMX.
- Older and still useful: VB.NET, ASP.NET MVC, SOAP, SAP and WMS integration,
  CFDI v3.3 / v4.
- Industrial / hardware: OPC UA, X10, Arduino, Raspberry Pi, AGVs, conveyors
  and sorter systems.

## Education
- Mechatronics Engineering, Fray Luca Paccioli, 2013.
- Electronics and Communications Engineering, 8 semesters, Instituto Politécnico
  Nacional, 2010.

## Things that are NOT known
Anything not stated above is unknown. This explicitly includes: salary
expectations, notice period, visa or work-authorisation status, willingness to
relocate, references, and any technology not listed. Do not infer them.
`.trim();
