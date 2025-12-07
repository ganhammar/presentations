---
theme: apple-basic
title: "Clear Skies Ahead: Platform Acceleration with Azure Verified Modules for Terraform"
description: Discover how our platform engineering team transformed Azure infrastructure delivery from slow, ticket‑driven requests into fast, developer‑initiated self‑service. By implementing Azure Verified Modules (AVM) for Terraform, we standardized and automated our Azure Landing Zone, cutting lead times while maintaining security and compliance. This approach allows Horse Powertrain's developers to quickly build the cloud resources they need without bottlenecks, and gives the central team more time to focus on innovation.
colorSchema: 'dark'
transition: slide-left
image: './assets/clear-skies-ahead.jpg'
layout: intro-image
routerMode: 'hash'
---

<div class="absolute bottom-15">
  <span class="font-700 text-shadow">
    Anton Ganhammar
  </span>
</div>

<div class="absolute top-15 text-shadow">
  <h1>Clear Skies Ahead</h1>
  <p>Platform Acceleration with Azure Verified Modules</p>
</div>

---
layout: section
---

<div class="flex gap-12 items-center">
  <div class="flex-1">

# Where We Were

  </div>
  <div class="w-60">
    <img src="./assets/service-now.svg" alt="ServiceNow Logo" class="w-60" />
  </div>
</div>

<!--
* I joined Aurobay, or Horse Powertrain.

* Large team, 7 people.
* A team driven by tickets.
* Tasks were shielded from the developers, manual intervention.

* Started with a new workload, we were required to be there every step on the way.
* Not even possible for teams to follow our architectural principles fully.
* For instance, IaC not possible, blocked from deploying parts of definition.
-->

---
layout: image-left
image: './assets/get-it-done.png'
---

# Time Pressure

* Fast exit from Volvo, "just fix it".
* Platform based on [Cloud Adoption Framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/).
* Infrastructure-as-Code, at best, an afterthought.
* Inconsistences in our environment.

<!--
* Done right, Cloud Adoption Framework.
* Created using Azure Landing Zones, snapshot.
* Scale not considered.

* IaC was, at best, an afterthought. IaC not the leading source, exported nightly jobs.

* Inconsistencies in our environment.
* Automations do not like inconsistencies.

* Zero-trust to the extremes, for instance break-glass accounts with mfa fire proof lockers.
* Never trust the developers.
-->

---
layout: image-right
image: './assets/devops.png'
---

# Platform Engineering

> Platform Engineering is the application of DevOps principles at scale.

<br />

* Self-service within a secure, governed framework
* The platform is our product, the developers our customers
* Start with dirt trails, some will eventually become golden paths
* Centralize and scale specialized knowledge, reducing cognitive and manual work

<!--
* Platform Engineering is the application of DevOps principles at scale.
* The platform is our product, the developers our customers
* Self-service within a secure, governed framework
* Start with dirt trails, some will eventually become golden paths
* Centralize and scale specialized knowledge, reducing cognitive and manual work
* For Azure, Cloud Adoption Framework and specifically Azure Landing Zones is their way to handle platform engineering at scale
-->

---
layout: image-left
image: './assets/launch-pad.png'
---

# What Are Azure Landing Zones?

* Azure Landing Zone = Secure, Governed Foundation for cloud workloads
* Prepares Azure Environment with policies, connectivity, and shared services
* Enables scalable and compliant workload deployments from day one

<!--
* What is an Azure Landing Zone? It's the baseline architecture and configuration. 
* Sets the stage for successfully running our workloads in the cloud. 
* Launchpad — Strong, well-prepared foundation for your mission to succeed.
* Rockets can launch faster and more frequently due to our platform.
* Foundation not just about spinning up resources; security, governance and connectivity.
* Bumpers in a bowling alley keep the ball headed toward the pins.
* Enables team to innovate freely while staying within safe boundaries.
* With an Azure Landing Zone in place, we avoid the “wild west” of unmanaged cloud resources.
* Let's look at some of the key building blocks of the platform.
-->

---
layout: image-right
image: './assets/management-groups.svg'
---

# Management Groups Hierarchy

* Organize subscriptions into a logical structure
* Apply governance (policies, RBAC) at scale through inheritance
* User-facing management groups:
  * **Corp**: Workloads requiring on-prem connectivity, stricter governance
  * **Online**: Internet-facing workloads, more autonomy
  * **Sandbox**: Short-lived experiments, little governance

<!--
* Management groups are containers that sit above subscriptions.
* Apply policies and access controls once, cascade down to subscriptions.
* In Azure Landing Zones, the Corp management group is for workloads that need to connect.
* Online is for public-facing services that don't need that connectivity.
* In cases with both is needed, recommended to expose API through Azure API Management.
* Teams need to choose which landing zone fits their workload's requirements.
-->

---
layout: image-right
image: './assets/policy.svg'
---

# Azure Policy

* Automated guardrails at scale
* Inherited from management groups
* Enforce standards (allowed regions, required tags, etc.)
* Execute template deployment (e.g. inherit tags if not set)
* Policies should align with Microsoft Defender for Cloud

<!--
* Automated guardrails at scale
* Inherited from management groups
* Enforce standards (allowed regions, required tags, etc.)
* Execute template deployment (e.g. inherit tags if not set)
* Policies should align with Microsoft Defender for Cloud
-->

---
layout: image-right
image: './assets/democracy-vs-autocracy.jpg'
---

# Azure Subscriptions

* Guarded process
* Leads to reuse and unclear boundaries
* [ALZ promotes](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-principles#subscription-democratization) democratization:
  * Units of management
  * Separate application environments
  * Self-service vending process
  * Offer multiple types to support differing requirements
  * Scalable management group hierarchy as a foundation

<!--
* Requesting a new subscription, at the time, required a lot.
* Sandbox, architecture diagram.
* Once approved, creation manual, several elevated accounts.
* Lead to teams not requesting new subscriptions for new workloads.
* Subscriptions became buckets for entire streams.
* Doesn't align with the Azure Landing Zones philosophy, promotes democratization.
  * Units of management
  * Separate application environments
  * Self-service vending process
  * Offer multiple types to support differing requirements
  * Scalable management group hierarchy as a foundation
-->

---

# Network Architecture Design

<img src="./assets/network-architecture-before.png" alt="Network Architecture Before" />

<!--
* Horse Powertrain manufactures car parts.
* Majority of our employees work in factories around the globe.
* Software we build and maintain supports factories, response time crucial.
* A lot of infrastructure is on-prem, architectural principles promote cloud first.
* Hybrid cloud setup, network extends into the private networks of the factories and office sites.
* To support this, we're following the hub-spoke network topology.
* Centralized architecture where a hub virtual network serves as the central point of connectivity.
* Spokes are isolated networks that manage workloads independently.
* The hub facilitates secure routing, cross-premises connectivity, DNS management, and remote access.
* Effective IP address management is critical.
* Huge flaw in arch diagram, lead to headaches and extra work.
-->

---
layout: image-right
image: './assets/private-endpoint.svg'
---

# Private Endpoint

* A network interface that uses a private IP from your virtual network
* Private, secure, connectivity powered by Azure Private Link
* Access existing DNS service configuration privately through private DNS zones

<!--
* A network interface that uses a private IP from your virtual network
* Private, secure, connectivity powered by Azure Private Link
* Access existing DNS service configuration privately through private DNS zones
-->

---
layout: image-right
image: './assets/getting-inside.png'
---

# The Process of Getting Inside

> I need to make my service accessible within our internal network (without exposing it publicly).

<br />

* _Step 1_: New spoke
* _Step 2_: New private endpoint
* _Step 3_: Firewall opening
* _Step 4_: Peer VNet with other VNet

<!--
* Pains of getting a subscription, getting inside the network was not easy either.
* Getting a spoke, Service Now request.
* An engineer calculated the next IP address range to allocate and stored in central table.
* Creating the Virtual Network and related resources was semi-manual.
* When more space was needed, new ticket, more manual work.
* To access the service, like a Storage Account, within the network, request Private Endpoint.
* Still not accessible outside of Azure, needed to request firewall opening.
* DNS resolver architecture issues often lead to additional requests to peer VNets.
-->

---
layout: statement
---

# Democratization
## With Azure Verified Modules for Terraform

---
layout: section
---

<div class="flex items-center justify-between gap-8">
  <div class="flex-1">
    <h1>Pain Points</h1>
    ☐ Subscriptions
    <br />
    ☐ Network Vending
    <br />
    ☐ Accessing Azure Services
  </div>
  <div>
    <img src="./assets/weary-emoji.png" class="h-60 mr-15">
  </div>
</div>

---

<style>
ol {
  list-style-type: decimal;
}
</style>

# The Plan

1. Migrate platform resources to infrastructure-as-code
    * Management Groups
    * Policies
    * Private DNS Zones
    * Hub-Spoke Topology
1. Setup subscription vending, keep existing patterns
1. Add network infrastructure vending to the subscription vending
1. Automate DNS joining of private endpoints
1. Plead our case to open 443 network traffic towards Azure 

---
layout: image-left
image: './assets/avm-logo.png'
---

# Why Azure Verified Modules for Terraform?

* Retrofit a modern solution into an outdated structure
* Modular approach to deploying platform landing zones
* Over 130 resource/pattern/utility modules
* Owned, developed & supported by Microsoft
* Why not AVM for Bicep?

---
layout: section
---

## Step 1: [Migrate Platform Resources](https://github.com/ganhammar/avm-alz-platform-vending-sample/tree/step-1)

* Management Groups and Policy Pattern Module ([avm-ptn-alz](https://registry.terraform.io/modules/Azure/avm-ptn-alz))
* Hub and Spoke Pattern Module ([avm-ptn-alz-connectivity-hub-and-spoke-vnet](https://registry.terraform.io/modules/Azure/avm-ptn-alz-connectivity-hub-and-spoke-vnet/azurerm/0.16.2))
* Private DNS Zone for Private Link Pattern Module ([avm-ptn-network-private-link-private-dns-zones](https://registry.terraform.io/modules/Azure/avm-ptn-network-private-link-private-dns-zones))

---

# Step 2: [Subscription Vending Machine](https://github.com/ganhammar/avm-alz-platform-vending-sample/tree/step-2)

<div class="absolute inset-0 flex items-center justify-center">
  <img src="./assets/subscription-vending.png" alt="Subscription Vending" class="w-200" />
</div>

---
layout: section
---

<div class="flex items-center justify-between gap-8">
  <div class="flex-1">
    <h1>Pain Points</h1>
    ☑︎ Subscriptions
    <br />
    ☐ Network Vending
    <br />
    ☐ Accessing Azure Services
  </div>
  <div>
    <img src="./assets/neutral-emoji.png" class="h-60 mr-15">
  </div>
</div>

---

# Step 3: [Vending Network Spokes](https://github.com/ganhammar/avm-alz-platform-vending-sample/tree/step-3)

<div class="absolute inset-0 flex items-center justify-center">
  <img src="./assets/subscription-vending-with-network.png" alt="Subscription Vending With Network" class="h-80" />
</div>

---
layout: image-right
image: './assets/ipam-logo.png'
---

# IP Address Management

* If you don't need a full blown tool: [avm-utl-network-ip-addresses](https://registry.terraform.io/modules/Azure/avm-utl-network-ip-addresses/azurerm/latest)
* Automatically discovers IP address utilization
* RESTful API to facilitate IP address management at scale with IaC
* Intuitive UI where users can get insights into IP address allocation
* Delivered via a container that can run on anything from Azure Functions to AKS/ACA

<!--
The solution to our struggle with IP address allocation.
-->

---
layout: section
---

<div class="flex items-center justify-between gap-8">
  <div class="flex-1">
    <h1>Pain Points</h1>
    ☑︎ Subscriptions
    <br />
    ☑︎ Network Vending
    <br />
    ☐ Accessing Azure Services
  </div>
  <div>
    <img src="./assets/slightly-smiling-emoji.png" class="h-60 mr-15">
  </div>
</div>

---
layout: section
---

## Step 4: [Democratizing Private DNS Zones](https://github.com/ganhammar/avm-alz-platform-vending-sample/tree/step-4)

Handle DNS joins through Azure Policies, provided through ALZ library and fix Private Resolver architecture.

---

# Private Resolver Architecture

<style>
.slidev-vclick-target {
  transition: opacity 300ms ease-in-out;
}
</style>

<div class="relative w-full">
  <img v-click.hide="1" src="./assets/network-architecture-before.png" alt="Network Architecture Before" class="w-full" />
  <img v-click="[1, 2]" src="./assets/network-architecture-dns-zones-peered-to-resolver-vnet.png" alt="Network Architecture - DNS Zones Peered to Resolver VNet" class="w-full absolute top-0 left-0" />
  <img v-click="[2, 3]" src="./assets/private-resolver-architecture-before.png" alt="Private Resolver Architecture Before" class="h-full absolute top-0 left-50" />
  <img v-click="3" src="./assets/private-resolver-architecture-after.png" alt="Private Resolver Architecture After" class="h-full absolute top-0 left-50" />
</div>

<!--
We were lacking a proper private resolver DNS architecture. And, since no teams were allowed to manage their network resources, they had to request help from us, linking their VNets with the private DNS zones that they needed access to.
-->

---


<div class="flex gap-8 items-center">
  <div class="w-30%">
    <img src="./assets/dns.svg" alt="Azure DNS logo" />
  </div>
  <div class="flex-1">
    <h1>Centralized DNS Architecture</h1>
    <p>Microsoft <a href="https://learn.microsoft.com/en-us/azure/dns/private-resolver-architecture">describes</a> two private resolver architectures.</p>
    <p><strong>Centralized DNS:</strong></p>
    <ul>
      <li>Spoke VNets use the Private DNS Resolvers</li>
      <li>All DNS queries from spoke go to the hub</li>
      <li>Simpler configuration, slower resolution</li>
    </ul>
    <p><strong>Distributed DNS:</strong></p>
    <ul>
      <li>Spoke VNets use Azure-provided DNS</li>
      <li>Each VNet resolves independently, spoke forwards via rules</li>
      <li>More complex to manage, but faster resolution</li>
    </ul>
  </div>
</div>

<!--
This approach is referred to as "Centralized DNS Architecture" in the Microsoft documentation. The other option covered in the documentation is "Distributed DNS Architecture".

* Centralized DNS:
  * Spoke VNets use the Private DNS Resolvers
  * All DNS queries from spoke go to the hub
  * Simpler configuration, slower resolution
* Distributed DNS:
  * Spoke VNets use Azure-provided DNS
  * Each VNet resolves independently, spoke forwards via rules
    * Forward specific queries (e.g., privatelink.* zones, on-prem domains) to the Private DNS Resolver in the hub
  * More complex to manage, but faster resolution
-->

---
layout: section
---

## Step 5: Pleading

Open traffic on port 443 towards Azure

---
layout: section
---

<div class="flex items-center justify-between gap-8">
  <div class="flex-1">
    <h1>Pain Points</h1>
    ☑︎ Subscriptions
    <br />
    ☑︎ Network Vending
    <br />
    ☑︎ Accessing Azure Services
  </div>
  <div>
    <img src="./assets/sunglasses-emoji.png" class="h-60 mr-15">
  </div>
</div>

---

# The Impact

* Subscriptions are no longer shielded through complicated request flows
* Virtual Network creation and amendment is a request away!
* Private Endpoints can be created by anyone:
  * They can be included in IaC definitions
  * The DNS names, and underlying service, can now be accessed within our network
* We're no longer a team driven by tickets and have time to innovate

<!--
Transition to next slide: "Innovations such as:"
-->

---
layout: fact
---

<div class="flex flex-col items-center gap-8">
  <div class="text-center">
    <h1>Thanks!</h1>
    <h2>Questions?</h2>
    <p>
      <a href="https://linkedin.com/in/ganhammar">linkedin.com/in/ganhammar</a> |
      <a href="https://github.com/ganhammar">github.com/ganhammar</a> |
      <a href="https://ganhammar.se">ganhammar.se</a>
    </p>
  </div>
  <div class="flex items-center flex-col">
    <img src="./assets/qr-code.png" alt="QR Code to presentation" class="w-25 h-25" style="border: 5px solid white;" />
  </div>
</div>
