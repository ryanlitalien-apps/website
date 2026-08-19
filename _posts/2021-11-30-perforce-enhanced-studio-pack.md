---
layout: post
title: "What Is the Perforce Enhanced Studio Pack? Everything You Need For the Cloud."
published_at: 2021-11-30
tags:
  - Perforce
  - Cloud
  - Game Development
image: /assets/img/blog/blog-image-enhanced-studio-pack-2.jpg
---

*Originally published on the [Perforce blog](https://web.archive.org/web/20250118065036/https://www.perforce.com/blog/vcs/perforce-enhanced-studio-pack), November 30, 2021. Republished here for posterity as the original moves and changes.*

We talked to users, discussed workflows, simplified onboarding, and learned how companies from [indie developers](https://www.perforce.com/solutions/game-development) to enterprise game studios deploy [version control](https://www.perforce.com/video-tutorials/vcs/version-control-overview) at scale to create a new way to easily deploy Helix Core into the [cloud](https://www.perforce.com/resources/vcs/cloud-version-control-guide).

The [Perforce Enhanced Studio Pack (ESP)](https://www.perforce.com/perforce-and-cloud) contains all the tools needed for world-class development in a single, pre-configured environment. It offers a production-ready, turn-key bundle of Perforce software that teams can deploy on [AWS](https://www.perforce.com/blog/vcs/aws-version-control) and [Azure](https://www.perforce.com/blog/vcs/what-microsoft-azure-cloud). It includes Infrastructure as Code and configuration management settings with pre-selected smart defaults.

## What Is Included in the Perforce Enhanced Studio Pack

The Perforce Enhanced Studio Pack provides teams with free Perforce software — deployed their way:

- Helix Core Version Control
- [Helix Swarm](https://www.perforce.com/products/helix-swarm) Code Review
- [Helix Plan (formerly Hansoft)](https://www.perforce.com/products/hansoft) Project Management

## Perforce Enhanced Studio Pack Layers in Build Order

The Enhanced Studio Pack is made up of several layers. They all stack upon one another, so each layer is abstracted from the next, which allows parameters to be dynamically passed.

### Packer Builds

[Packer](https://www.packer.io/) is the tool and the domain-specific language (DSL) is used to define what is included in each machine image. These dictate what gets provisioned on a base image (Rocky Linux). We provide packer projects for the following machine images:

- Helix Core
- Helix Swarm
- Helix Plan

After packer builds are complete, they are uploaded to the Cloud Service Provider (CSP), available on both [Microsoft Azure](https://www.perforce.com/blog/vcs/what-microsoft-azure-cloud) and [AWS](https://www.perforce.com/blog/vcs/aws-version-control). These become usable, referenceable machine images.

### Machine Images

Machine images are a "package" that contains the OS, OS configuration, application installation, and application configuration.

The term machine image is used when talking about all clouds. If you are referencing AWS, it’s called an AMI (Amazon Machine Image). On Azure, it’s called a Virtual Machine Image. The Enhanced Studio Pack will reference these machine images by a unique identifier (ID or GUID).

### Infrastructure as Code (IaC)

> [Infrastructure as Code](https://www.perforce.com/blog/vcs/how-build-infrastructure-code-aws-cloudformation) defines how the cloud infrastructure is set up. This allows you to declare your software stack in code so it can be shared, collaboratively worked on, and versioned. This prevents manual coding mistakes when deploying a [complex architecture](https://www.perforce.com/vcs/high-latency-optimized-network).

With the Enhanced Studio Pack, teams can easily install, configure, and tune deployments. Using Infrastructure as Code enables teams to jump-start development to access sensible, smart enterprise-ready defaults to go from proof of concept into production, fast.

Regardless of where a team may deploy and maintain their Helix Core infrastructure, they will have the same repeatable, consistent architecture. Review the [Gliffy diagram](https://www.gliffy.com/) below showing a basic commit/edge Helix Core architecture. The Perforce Enhanced Studio Pack only deploys one commit server (as of today). But this is an example topology that can be easily extended to enhance global collaboration.

For example, the commit server could be installed in the us-west region, with the forwarding replicas in another region, closer to artists and developers. The edge server could then be located in the eu-central region. Many different Helix Core architecture topologies can be implemented.

For more suggestions, read through the [server administration guide](https://www.perforce.com/manuals/p4sag/Content/P4SAG/deployment-architecture.html) for more suggestions.

## What the Perforce Enhanced Studio Pack Installs

This is an ordered list of what the Perforce Enhanced Studio Pack installs as part of the deployment:

- Perforce networking stack.
- Networking security group.
- [Identity and access management](https://www.perforce.com/blog/vcs/cloud-identity-access-management-best-practices).
- Helix Core commit server.
- Helix Plan server.
- Helix Swarm server.
- Data lifecycle management policies for creating backup disk snapshots.
- Helix Swarm extension configuration.

## Example of Perforce Enhanced Studio Pack Infrastructure as Code

Review the examples of the Infrastructure as Code (IaC) shown below:

Here is a snippet showing Helix Plan instance sizing specific to Azure:

```
"hansoftVMSize": {
  "type": "string",
 "allowedValues": [
     "Standard_D2_v4",
     "Standard_D4_v4",
     "Standard_D8_v4",
     "Standard_D16_v4",
     "Standard_F2s_v2",
      "Standard_F4s_v2",
     "Standard_F8s_v2",
     "Standard_F16s_v2",
     "Standard_F32s_v2",
     "Standard_F48s_v2"
  ],
 "defaultValue": "Standard_D2_v4",
 "metadata": {
   "description": "Please select the size of the VM you wish to deploy."
   }
}
```

Here is a similar snippet of Helix Plan instance sizing:

```
Parameters: 
  InstanceType: 
    Type: String
    Default: m5.large
    AllowedValues:
      - t3.nano
      - t3.micro
      - t3.small
      - t3.medium
      - m5.large
      - m5.xlarge
      - m5.2xlarge
      - m5.4xlarge
      - m5.8xlarge
    Description: "Select Hansoft server EC2 instance type."
```

## What Is Customizable in the Perforce Enhanced Studio Pack?

Teams can download the Perforce Enhanced Studio Pack, customize it, and run it in their cloud of choice — [Azure](https://www.perforce.com/products/helix-core/install-enhanced-studio-pack-azure) and [AWS](https://www.perforce.com/products/helix-core/install-enhanced-studio-pack-aws). In addition, we also provide a Helix Core Marketplace VM Image for both [Google Cloud Platform](https://www.perforce.com/blog/vcs/what-google-cloud-platform) and [DigitalOcean](https://www.perforce.com/blog/vcs/what-is-digital-ocean).

To make the Perforce Enhanced Studio Pack easy to deploy, the number of available creation fields has been minimized. We have found the Perforce Enhanced Studio Pack is popular with smaller studios and companies that are trying to get Helix Core up and running with little administration on a cloud of their choosing.

The small studios usually do not have a dedicated IT admin, which is why we have chosen smart enterprise defaults for many options.

In addition, we limited user access roles and policies, selected efficient disk types, worked with [OpenLogic](https://www.openlogic.com/openlogic-solutions) to use their publicly available, hardened images, enabled SSL, and used standardized networking topologies.

## Perforce Enhanced Studio Pack Smart Defaults & How to Customize

The Perforce Enhanced Studio Pack comes with smart defaults as well as provides teams with the ability to customize to fit their unique needs.

### Server Deployment Package (SDP)

The Perforce Enhanced Studio Pack uses the [Server Deployment Package](https://swarm.workshop.perforce.com/projects/perforce-software-sdp/) (SDP) to help deploy the Helix Core product onto the Linux Rocky server.

The SDP comes with configuration settings aimed at production-ready, scalable, and resilient installations, regardless of what you put into Helix Core, Helix Plan, or Helix Swarm.

An example a smart default is turning on autocompress, which turns on auto compressing files onto a disk:

```
p4 configure set lbr.autocompress=1
```

Another smart default is setting the P4ROOT volume to have a minimum of 5 gigabytes free to prevent data loss:

```
p4 configure set filesys.P4ROOT.min=5G
```

View the full list of p4d configs [here](https://www.perforce.com/manuals/cmdref/Content/CmdRef/configurables.configurables.html).

### Networking

Our templates suggest using your own IP address as part of the install, so only your own computer is allowed access.

Example description from the CIDR input:

“Input your public IP address in CIDR notation."

Example: 162.244.43.80/32.

If you do not readily know your IP address, use a service like whatismyipaddress.com to find your public IP address.

### Disk Volumes

The Helix Core server is based on the hardened OpenLogic Rocky Linux distribution:

**Depot**

- Holds depot data and checkpoints.
- Defaults to 500GB.
- Volume type defaults to an SSD.

**Metadata**

- Holds P4D database.
- Defaults to 64GB.
- Volume type defaults to an SSD.

**Logs**

- Holds P4D logs and journal.
- Defaults to 64GB.
- Volume type defaults to an SSD.

Volume type and volume size parameters can be changed both pre- and post-deployment. When running in the cloud, dynamically resizing your instances, volumes, and networking requires only minutes, not months. This enables teams to start small and grow as needed.

## See How the Perforce Enhanced Studio Pack Works

Check out how the environment looks from a bird’s eye view.

### Azure Diagram

![Azure ESP diagram](/assets/img/blog/esp-studio-on-azure-diagram.jpeg)

### AWS Diagram

![AWS ESP example](/assets/img/blog/esp-feature.jpeg)

## Perforce Enhanced Studio Pack Deployment Tutorials

Learn how to deploy the Perforce Enhanced Studio Pack in these tutorial on-demand webinars.

## Perforce Enhanced Studio Pack — Get Started Today

Easily deploy the Perforce Enhance Studio Pack today.

## Related Resources to Help You Get Started

Here are some helpful links to get you started.

- [**Helix Core QuickStart**](https://help.perforce.com/helix-core/quickstart/)
- [**FAQs (Frequently Asked Questions)**](https://www.perforce.com/resources/vcs/cloud-version-control-guide)
- [**Configuring Helix Core for Unity and Unreal Engine**](https://www.perforce.com/products/helix-core/configure-helix-core-game-engine)
- [**Helix Core Server Admin Guide**](https://www.perforce.com/manuals/p4sag/Content/P4SAG/Home-p4sag.html)
- [**Instructions to Install Enhanced Studio Pack on Azure**](https://www.perforce.com/products/helix-core/install-enhanced-studio-pack-azure)
- [**Instructions to Install Enhanced Studio Pack on AWS**](https://www.perforce.com/products/helix-core/install-enhanced-studio-pack-aws)
- [**Server Deployment Package Docs**](https://swarm.workshop.perforce.com/view/guest/perforce_software/sdp/dev/doc/SDP_Guide.Unix.html)
