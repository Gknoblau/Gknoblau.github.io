---
layout: post
title: Minimalist Docker Images
---


# Minimalist Docker Images

There seems to be a lot of buzz lately around clearing out junk you don't need. Netflix's latest hit Tidying Up with Marie Kondo focuses on discarding things that don't give you joy.

We should apply the same concept when building our docker images.

OS Distributions come with a ton of tools, utils and libraries that aren't often needed to run our application. 

So if we aren't using these tools, we shouldn't bundle them with our application.

## Card Shuffling Application

GoLang programs often are quite small in size and need no packaged/libraries installed on the host operating system. 

Here is a small Go application that outputs a shuffled deck of cards:

https://github.com/Gknoblau/Go-Complete-Developers-Guide/tree/master/cards

To generate the application binary run:

```bash
env GOOS=linux go build main.go deck.go
```

The resulting binary size is about ~1.8MB.

## Building Docker Images for Our App

Now that we have our app we need to drop it in a docker image. We have a few options when it comes to operating systems.

### Common Distros


#### Amazon Linux

```shell
FROM amazonlinux:2
COPY main /root
CMD ["/root/main"]
```

*Size=164MB*

#### Ubuntu

```shell
FROM ubuntu:18.04
COPY main /root
CMD ["/root/main"]
```

*Size=90MB*

### Lightweight Distros

These distributions are more container friendly and much smaller in size

#### Amazon Alpine

```shell
FROM alpine:3.8
COPY main /root
CMD ["/root/main"]
```

*Size=6.31MB*

#### BusyBox

```shell
FROM busybox:1.30
COPY main /root
CMD ["/root/main"]
```

*Size=3.1MB*

### No Distro

```shell
FROM scratch
COPY main /
CMD ["/main"]
```

*Size=2.02MB*

## Results

```bash
REPOSITORY          TAG                 SIZE
shufflecards        scratch             2.02MB
shufflecards        busybox             3.1MB
shufflecards        alpine              6.31MB
shufflecards        amazonlinux         164MB
shufflecards        ubuntu              90MB
amazonlinux         2                   162MB
ubuntu              18.04               88.1MB
alpine              3.8                 4.41MB
busybox             1.30                1.2MB
```

As you can see, we can run our application in a container for ~2MB.

## Conclusion

We now have a very small and very secure Docker image to run our application. 
