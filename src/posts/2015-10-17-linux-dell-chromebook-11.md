---
title: Arch Linux on a Dell Chromebook 11 (2014)
tags: arch linux dell chromebook
---

This week I got a 2014
[Dell Chromebook 11](http://www.dell.com/us/business/p/chromebook-11/pd) as a
secondary laptop for carrying around to classes. It’s now discontinued, but it
fills that purpose perfectly. However, there’s some things you have to be aware
of when installing Arch Linux on it.

<!--more-->

# Installing Arch

The steps are nearly the same as what the
[Arch wiki page](https://wiki.archlinux.org/index.php/Dell_Chromebook_11)
recommends. However, there’s some outdated info there:

1. The patched SeaBios linked to there is outdated. If you have the Core i3
model like I do, you’ll want to scroll down and find the updated BIOS…
1. But you don’t even want to do that. Instead, use
   [John Lewis’s patched SeaBIOS](https://johnlewis.ie/custom-chromebook-firmware/rom-download/).
   This will let you actually change the backlight.
1. The wiki page neglects to mention it, but if you’re not dual-booting, don’t
   use UEFI/GPT. It won’t work and you’ll be confused. Set up a BIOS/MBR system
   and use GRUB as your bootloader.

Afterwards, set up Arch like normal. Some tips:

1. Use [xf86-input-cmt](https://aur.archlinux.org/packages/xf86-input-cmt/) for
   your touchpad drivers; in my experience, Synaptics was frustrating to use
   because the touchpad would randomly stop responding.
1. Blacklist `echi_pci` in GRUB: https://wiki.archlinux.org/index.php/Chrome_OS_devices#With_kernel_parameters

That’s pretty much all I’ve run into so far. Other quick notes:

1. In terms of battery life, I’m getting between 3 and 10 hours estimated
   usage—Firefox is a very heavy power draw. At idle or doing light work in
   Emacs, the power draw is between 3 and 5 watts, giving me 7 to 10 hours of
   battery, but Firefox can easily double that usage to 10 watts.
1. The laptop is silent most of the time—when its fans aren’t running—but as
   soon as the fans kick in, you’ll notice them. There’s also no way to control
   them; `lm_sensors` and `fancontrol` don’t detect them.
1. `xbacklight` can’t adjust the backlight for some reason, but you can do it
   manually with `/sys/class/backlight`. There is some kernel parameter that
   needs to be set.
1. I wish Dell had gone for at least a matte screen; the glossy screen is quite
irritating in brightly lit environments.
1. The charger light is also annoying at night—it can light up a desk and is
   annoying if you’re trying to sleep.

Overall, for the $290 (tax+shipping) I paid, I’m happy for what I got—a light,
long-lasting portable laptop that is still reasonably powerful (ULV Haswell i3,
4GB RAM), for programming tasks. The only task remaining is to find a
lightweight web browser.
