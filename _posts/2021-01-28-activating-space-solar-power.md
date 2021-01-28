---
title: Activating Space Solar Power
layout: post
tags: project
date: '2021-01-28 14:45:02'
---

Two days ago, I scheduled a call with Brandon,[^brandon] asking to brainstorm together about research questions/directions for my space solar power research.

In the past week or two, I've been skimming through an intro electrical engineering course and reading Prof. Naoki Shinohara's 2014 book *Wireless Power Transfer via Radiowaves*. Though complex circuit diagrams and graphs still went over my head, through the combination of the two I began to get a sense of how the components of microwave power transmission worked: notes on semiconductor HPAs, microwave tubes, phase shifts, rectifier circuits, and what have you filled my notebook.

Yet, after finishing Prof. Shinohara's book and reading his chapter on SSP in another 2018 book, I struggled to find a clear chasm or create connections for the way forwards. Where did the problem, the bottleneck lie? What kind of paper could I write, or research could I do, that would be a meaningful contribution to the pursuit of space solar power?

I found myself bouncing around web articles and videos aimlessly. [In one video](https://www.youtube.com/watch?v=bveGhdtlFn0), I was slightly demoralized to find out that Elon Musk had called SSP the "stupidest idea ever" owing to the amount of conversions taking place in the process compared to terrestrial solar power with battery storage. Eventually, I stumbled upon an [ESA competition for new SSP ideas](https://ideas.esa.int/servlet/hype/IMT?documentTableId=45087625530300097&userAction=Browse&templateName=&documentId=514a8db636ea637f6e27069183966350) that had just closed on January 12, 2021. On the competition page, ESA listed a few challenge areas for SSP (paraphrased):

- Manufacturing, deploying, and constructing very large structures in space
- Onboard energy conversion from solar to electric to RF
- Thermal systems
- Microwave generation, control, focusing, and pointing
- RF to electricity conversion on receiving end

I jotted these down in my notebook without giving too much thought to them.

Twenty minutes before my meeting with Brandon, I pulled them up again.

The latter four bullet points came into my mind, and out again. I had some inklings of the improvements that needed to be made in WPT components -- higher efficiency, lower size and weight, lower cost -- but they didn't seem to be bottlenecks for SSP. Research on long-distance WPT has been done and continues to be done.

The first point, on the other hand, stuck out to me. The big reason we don't have any SSP satellites in orbit today is...we can't launch them. The physics of MPT require a kilometer-scale, or at least several-hundred-meters scale antenna to be deployed in space, for any sort of efficient transfer to the ground from LEO or GEO. Such a satellite can't simply be packed onto a Falcon 9 and launched into space.

Snippets of thought began coming back to me: origami antennas, Caltech's solar panel array deployment research. A quick Google search yielded several articles and papers about the deployment of large-scale structures in space, for SSP and other applications.

Unlike the technical optimizations of WPT, launch and deployment are intuitive problems that need to have rock-solid solutions for space solar power to get anywhere.

"The overall vision has been validated, it's the operational details that need to be worked out," Brandon frames it in our conversation. He brings up what I call the TKS "activator thesis": the vast majority of problems and opportunities in the world don't have theoretical obstacles, but rather execution/activation ones. The discovery of penicillin would have been completely forgotten if not for a US Army physician who discovered it buried in research papers during WWII.

Thus, rather than WPT technology directly, it seems that deployment of large-scale space structures would currently be the most fruitful area of research for realizing the SSP vision. The theoretical research and electric engineering has been demonstrated through a hundred spin-off applications, and will continue to improve. Deployment is the SSP-specific chasm that remains to be crossed. This was actually one of the first thoughts I had after learning about SSP: why hasn't there been a small demonstration satellite thrown up in orbit yet? Solving operational problems to the point where demonstrations can actually be made and momentum created is how innovative visions turn into executable reality.

Perhaps my hypothesis will be proven wrong, and there are significant bottlenecks elsewhere that I'll come to understand. But for now, after a week of somewhat directionless research that has yielded lots of general knowledge, I've stumbled upon a first concrete problem to aim towards.

[^brandon]: TKS New York Director, MIT MechE MS, former SpaceX and Raytheon employee